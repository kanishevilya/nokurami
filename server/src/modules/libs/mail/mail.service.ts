import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from "@react-email/components"
import { VerificationTemplate } from './templates/verefication.template';
import { SessionMetadata } from '@/src/shared/types/session-metada.types';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import { ChangeEmailTemplate } from './templates/change-email.template';
import { Enable2FATemplate } from './templates/enable-two-factor.template';
import { ChangeEmailConfirmTemplate } from './templates/change-email-confirm.template';

@Injectable()
export class MailService {

    public constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    public async sendVerificationToken(email: string, token: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(VerificationTemplate({ domain, token }))

        return this.sendMail(email, 'Верификация аккаунта', html)
    }

    public async sendPasswordResetToken(
        email: string,
        token: string,
        metadata: SessionMetadata
    ) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(
            ResetPasswordTemplate({ domain, token, metadata })
        )

        return this.sendMail(email, 'Сброс пароля', html)
    }

    public async sendMailChangeToken(
        email: string,
        token: string
    ) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(
            ChangeEmailTemplate({ domain, token })
        )

        return this.sendMail(email, 'Изменение Почты', html)
    }

    public async sendMailChangeConfirmToken(
        email: string,
        token: string
    ) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(
            ChangeEmailConfirmTemplate({ domain, token })
        )

        return this.sendMail(email, 'Изменение Почты', html)
    }

    public async sendEnable2FA(email: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(Enable2FATemplate({ domain }))

        return this.sendMail(email, 'Обеспечьте свою безопасность', html)
    }

    private sendMail(email: string, subject: string, html: string) {
        return this.mailerService.sendMail({
            to: email,
            subject,
            html
        })
    }
}
