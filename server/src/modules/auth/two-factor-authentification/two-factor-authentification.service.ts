import { User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { encode } from "hi-base32"
import { TOTP } from "otpauth"
import * as QRCode from "qrcode"
import { Enable2FAInput } from './inputs/enable.2fa.input';

@Injectable()
export class TwoFactorAuthentificationService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async generate(user: User) {
        const secret = encode(randomBytes(15)).replace(/=/g, '').substring(0, 24)

        const totp = new TOTP({
            issuer: "Nokurami",
            label: user.email,
            algorithm: "SHA1",
            digits: 6,
            secret
        })

        const otpauthUrl = totp.toString()
        const qrcodeUrl = await QRCode.toDataURL(otpauthUrl)

        return { qrcodeUrl, secret }
    }

    public async enable(user: User, input: Enable2FAInput) {
        const { secret, pin } = input

        const totp = new TOTP({
            issuer: "Nokurami",
            label: user.email,
            algorithm: "SHA1",
            digits: 6,
            secret
        })

        const result = totp.validate({ token: pin })

        if (result === null) {
            throw new BadRequestException("Неверный код")
        }

        await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                isTwoFAEnabled: true,
                twoFASecret: secret
            }
        })

        return true
    }

    public async disable(user: User) {
        await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                isTwoFAEnabled: false,
                twoFASecret: null
            }
        })
        return true
    }
}
