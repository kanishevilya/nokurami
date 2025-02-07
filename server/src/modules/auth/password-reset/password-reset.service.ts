import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { MailService } from '../../libs/mail/mail.service';
import { Request } from 'express';
import { GenerateToken } from '@/src/shared/utils/generate-token.util';
import { TokenType } from '@/prisma/generated';
import { NewPasswordInput } from './inputs/new-password.input';
import { hash } from 'argon2';
import { TelegramService } from '../../libs/telegram/telegram.service';

@Injectable()
export class PasswordResetService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly telegramService: TelegramService,
    ) { }

    public async reset_password(
        req: Request, input: ResetPasswordInput, userAgent: string
    ) {
        const { email } = input

        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email
            },
            include: {
                notificationSettings: true
            }
        })

        if (!existingUser) {
            throw new NotFoundException('Пользователь не найден')
        }

        const resetToken = await GenerateToken(this.prismaService, existingUser.id, TokenType.PASSWORD_RESET)

        const metadata = getSessionMetadata(req, userAgent)

        await this.mailService.sendPasswordResetToken(
            existingUser.email,
            resetToken.token,
            metadata
        )


        if (
            resetToken.user.notificationSettings.telegramNotificationsEnable &&
            resetToken.user.telegramChatId
        ) {
            await this.telegramService.sendResetPasswordToken(
                resetToken.user.telegramChatId,
                resetToken.token,
                metadata
            )
        }

        return true
    }

    public async new_password(input: NewPasswordInput) {
        const { token, newPassword } = input

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token: token,
                type: TokenType.PASSWORD_RESET
            }
        })

        if (!existingToken) { throw new NotFoundException("Токен не найден") }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) { throw new BadRequestException("Токен истек") }

        await this.prismaService.user.update({
            where: {
                id: existingToken.userId
            },
            data: {
                password: await hash(newPassword)
            }
        })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.PASSWORD_RESET
            }
        })

        return true
    }
}
