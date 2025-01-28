import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input';
import { GenerateToken } from '@/src/shared/utils/generate-token.util';
import { TokenType } from '@/prisma/generated';

@Injectable()
export class NotificationService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async findUnreadNotificationsCount(userId: string) {
        const count = this.prismaService.notification.count({
            where: {
                userId,
                isRead: false
            }
        })

        return count
    }

    public async findByUserId(userId: string) {
        await this.prismaService.notification.updateMany({
            where: {
                isRead: false,
                userId
            },
            data: {
                isRead: true
            }
        })

        const notifications = await this.prismaService.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return notifications
    }

    public async changeNotificationSettings(userId: string, input: ChangeNotificationsSettingsInput) {
        const { siteNotificationsEnable, telegramNotificationsEnable } = input

        const notificationSettings = await this.prismaService.notificationSettings.update({
            where: {
                userId
            },
            data: {
                siteNotificationsEnable,
                telegramNotificationsEnable
            },
            include: {
                user: true
            }
        })

        if (notificationSettings.telegramNotificationsEnable &&
            !notificationSettings.user.telegramChatId
        ) {
            const token = await GenerateToken(this.prismaService, userId, TokenType.TELEGRAM_AUTHENTICATION)

            return {
                notificationSettings,
                telegramToken: token
            }
        }
        if (!notificationSettings.telegramNotificationsEnable &&
            notificationSettings.user.telegramChatId
        ) {
            await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    telegramChatId: null
                }
            })
        }
        return { notificationSettings }
    }
}
