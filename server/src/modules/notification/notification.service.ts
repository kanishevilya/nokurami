import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input';
import { GenerateToken } from '@/src/shared/utils/generate-token.util';
import { NotificationType, Stream, TokenType, User } from '@/prisma/generated';
// import { NotificationModel } from './models/notification.model';
import { PubSub } from 'graphql-subscriptions';
import { NotificationModel } from './models/notification.model';
import { PUB_SUB } from '../libs/pub-sub/pub-sub.provider';

@Injectable()
export class NotificationService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
    ) { }


    public newNotificationAdded() {
        return this.pubSub.asyncIterableIterator('NEW_NOTIFICATION_ADDED');
    }

    public async publishNotification(notification: NotificationModel) {
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

    public async createStreamStart(userId: string, stream: Stream & { user: User }) {
        const notification = await this.prismaService.notification.create({
            data: {
                message: `<b>${stream.user.displayName} ведет трансляцию! </b>
                <p>${stream.title}</p>
				<p>Чтобы поддержать и пообщаться с <a href='/${stream.user.username}' className='font-semibold'> присоединяйтесь к стриму!</a></p>`,
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
                message: `<b>${follower.displayName} подписался на вас!</b>
				<p>Загляните в профиль, чтобы поприветствовать нового подписчика!</p>
                <a href='/${follower.username}' className='font-semibold'>Посмотреть профиль</a>`,
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

    public async createEnableTwoFactor(userId: string) {
        const notification = await this.prismaService.notification.create({
            data: {
                message: `<b>Обеспечьте свою безопасность!</b>
				<p>Включите двухфакторную аутентификацию в настройках вашего аккаунта, чтобы повысить уровень защиты.</p>`,
                type: NotificationType.ENABLE_TWO_FACTOR,
                userId
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
