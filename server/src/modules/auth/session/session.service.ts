import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './inputs/login.input';
import { verify } from 'argon2';
import { Request } from "express"
import { ConfigService } from '@nestjs/config';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { RedisService } from '@/src/core/redis/redis.service';
import { destroySession, saveSession } from '@/src/shared/utils/sessions.util';
import { VerificationService } from '../verification/verification.service';
import { TOTP } from 'otpauth';

@Injectable()
export class SessionService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
        private readonly verificationService: VerificationService,
    ) { }

    public async getAllSessions() {
        const keys = await this.redisService.keys('*')

        const userSessions = []

        for (const key of keys) {
            const session = JSON.parse(await this.redisService.get(key))
            userSessions.push(session)
        }
        userSessions.sort((a, b) => b.createdAt - a.createdAt)
        return userSessions
    }

    public async getSessionsByUser(req: Request) {
        const userId = req.session.userId;

        if (!userId) {
            throw new NotFoundException("Пользователь не обнаружен в сессии")
        }

        const keys = await this.redisService.keys('*')

        const userSessions = []

        for (const key of keys) {
            const sessionData = await this.redisService.get(key)

            if (sessionData) {
                const session = JSON.parse(sessionData)

                if (session.userId === userId) {
                    userSessions.push({
                        ...session,
                        id: key.split(':')[1]
                    })
                }
            }
        }

        userSessions.sort((a, b) => b.createdAt - a.createdAt)

        return userSessions.filter(session => session.id !== req.session.id)
    }

    public async getCurrentSession(req: Request) {
        const sessionId = req.session.id

        const sessionData = await this.redisService.get(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${sessionId}`)

        const session = JSON.parse(sessionData)

        return {
            ...session,
            id: sessionId
        }
    }

    public async clearSessions(req: Request) {
        req.res.clearCookie(
            this.configService.getOrThrow<string>("SESSION_NAME")
        )

        return true
    }

    public async remove(req: Request, id: string) {
        if (req.session.id === id) {
            throw new ConflictException("Текущую сессии удалить нельзя")
        }

        await this.redisService.del(
            `${this.configService.getOrThrow<string>("SESSION_FOLDER")}${id}`
        )
        return true
    }

    public async login(req: Request, input: LoginInput, userAgent: string) {
        const { login, password, pin } = input

        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { username: { equals: login } },
                    { email: { equals: login } },
                ]
            }
        })

        if (!user) {
            throw new NotFoundException("Пользователь не найден")
        }

        const isValidPassword = await verify(user.password, password)

        if (!isValidPassword) {
            throw new UnauthorizedException("Неверный пароль")
        }

        if (!user.isEmailVerified) {
            await this.verificationService.sendVerificationToken(user)

            throw new BadRequestException("Почта пользователя не верифицирована")
        }

        if (user.isTwoFAEnabled) {
            if (!pin) {
                return { message: "Необходим код для двухфакторной аутентификации" }
            }

            const totp = new TOTP({
                issuer: "Nokurami",
                label: user.email,
                algorithm: "SHA1",
                digits: 6,
                secret: user.twoFASecret
            })

            const result = totp.validate({ token: pin })

            if (result === null) {
                throw new BadRequestException("Неверный код")
            }

        }

        const metadata = getSessionMetadata(req, userAgent)

        return saveSession(req, user, metadata)
    }

    public async logout(req: Request) {
        return destroySession(req, this.configService)
    }


}
