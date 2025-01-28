import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input';
import { GenerateToken } from '@/src/shared/utils/generate-token.util';
import { NotificationType, TokenType, User } from '@/prisma/generated';
import { NotificationModel } from './models/notification.model';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class NotificationService {
    private readonly pubSub: PubSub


    public constructor(
        private readonly prismaService: PrismaService,
    ) {
        this.pubSub = new PubSub()
    }

    public async newNotificationAdded() {
        return this.pubSub.asyncIterableIterator('NEW_NOTIFICATION_ADDED');
    }

    public async publishNotification(notification: NotificationModel) {
        console.log(notification)
        this.pubSub.publish('NEW_NOTIFICATION_ADDED', {
            newNotificationAdded: notification,
        });
    }

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

    public async createStreamStart(userId: string, channel: User) {
        const notification = await this.prismaService.notification.create({
            data: {
                message: `<b className='font-medium'>${channel.displayName} ведет трансляцию!</b>
				<p>Чтобы поддержать и пообщаться <a href='/${channel.username}' className='font-semibold'>присоединяйтесь к стриму!</a></p>`,
                type: NotificationType.STREAM_START,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        this.publishNotification(notification as NotificationModel)
        return notification
    }

    public async createNewFollower(userId: string, follower: User) {
        const notification = await this.prismaService.notification.create({
            data: {
                message: `<b className='font-medium'>${follower.displayName} подписался на вас!</b>
				<p>Загляните в профиль, чтобы поприветствовать нового подписчика! <a href='/${follower.username}' className='font-semibold'>Посмотреть профиль</a></p>`,
                type: NotificationType.NEW_FOLLOWER,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        this.publishNotification(notification as NotificationModel)
        return notification
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
                telegramToken: token.token
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
