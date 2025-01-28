import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { VerificationInput } from './inputs/verification.input';
import { saveSession } from '@/src/shared/utils/sessions.util';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { TokenType, User } from '@/prisma/generated';
import { MailService } from '../../libs/mail/mail.service';
import { GenerateToken } from '@/src/shared/utils/generate-token.util';

@Injectable()
export class VerificationService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
    ) { }

    public async verify(req: Request, input: VerificationInput, userAgent: string) {
        const { token } = input

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token: token,
                type: TokenType.EMAIL_VERIFY
            }
        })

        if (!existingToken) { throw new NotFoundException("Токен не найден") }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) { throw new BadRequestException("Токен истек") }

        const user = await this.prismaService.user.update({
            where: {
                id: existingToken.userId
            },
            data: {
                userSecurity: {
                    update: {
                        isEmailVerified: true
                    }
                }
            }
        })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.EMAIL_VERIFY
            }
        })


        const metadata = getSessionMetadata(req, userAgent)

        return saveSession(req, user, metadata)
    }

    public async sendVerificationToken(user: User) {
        const verificationToken = await GenerateToken(this.prismaService, user.id, TokenType.EMAIL_VERIFY)
        await this.mailService.sendVerificationToken(user.email, verificationToken.token)
        return true
    }
}
