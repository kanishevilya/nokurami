import { Stream, TokenType, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { FUNCTIONS, MESSAGES } from './messages';
import { BUTTONS } from './buttons';
import { SessionMetadata } from '@/src/shared/types/session-metada.types';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
    private readonly _token: string

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
    ) {
        const token = configService.getOrThrow<string>("TELEGRAM_TOKEN");
        super(token)
        this._token = token
    }

    @Start()
    public async onStart(@Ctx() ctx: any) {
        const chatId = ctx.chat.id.toString()
        const token = ctx.message.text.split(' ')[1]

        if (token) {
            const telegramToken = await this.prismaService.token.findUnique({
                where: {
                    token: token,
                    type: TokenType.TELEGRAM_AUTHENTICATION
                }
            })

            if (!telegramToken) {
                await ctx.replyWithHTML(MESSAGES.invalidToken)
                return
            }

            const hasExpired = new Date(telegramToken.expiresIn) < new Date()

            if (hasExpired) {
                await ctx.replyWithHTML(MESSAGES.invalidToken)
                return
            }

            const success = await this.connectToTelegram(telegramToken.userId, chatId)

            await this.prismaService.token.delete({
                where: {
                    id: telegramToken.id,
                    type: TokenType.TELEGRAM_AUTHENTICATION
                }
            })

            if (!success) {
                await ctx.replyWithHTML("Этот чат уже используется другим пользователем ;(")
                return
            }


            await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess)
        } else {
            const user = await this.findUserByChatId(chatId)

            if (user) {
                await this.onMeCommand(ctx)
            } else {
                await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
            }
        }
    }

    @Command("me")
    @Action('me')
    public async onMeCommand(@Ctx() ctx: any) {
        const chatId = ctx.chat.id.toString()

        const user = await this.findUserByChatId(chatId)

        const followersCount = user.followers.length;

        const followingsCount = user.followings.length

        await ctx.replyWithHTML(
            FUNCTIONS.profile(user, user.userSecurity, followersCount, followingsCount),
            BUTTONS.profile
        )
    }

    @Command("followings")
    @Action("followings")
    public async onMyFollowingsCommand(@Ctx() ctx: any) {
        const chatId = ctx.chat.id.toString()

        const user = await this.findUserByChatId(chatId)
        const follows = await this.prismaService.follow.findMany({
            where: {
                followerId: user.id
            },
            include: {
                following: {
                    include: {
                        socialLinks: true
                    }
                }
            }
        })

        if (user && follows.length) {
            const followingsList = follows
                .map(follow => FUNCTIONS.formatFollowing(follow.following, follow.following.socialLinks))
                .join('\n')

            const message = `<b>👥 Каналы на который вы подписаны (${follows.length}):</b>\n\n${followingsList}`

            await ctx.replyWithHTML(message)
        } else {
            await ctx.replyWithHTML('<b>😔 У вас нет подписок.</b>')
        }
    }

    public async sendResetPasswordToken(chatId: string, token: string, metadata: SessionMetadata) {
        await this.telegram.sendMessage(
            chatId,
            FUNCTIONS.resetPassword(token, metadata),
            {
                parse_mode: 'HTML'
            }
        )
    }

    public async sendNewFollower(chatId: string, follower: User) {
        const user = await this.findUserByChatId(chatId)

        await this.telegram.sendMessage(
            chatId,
            FUNCTIONS.newFollower(follower, user.followings.length),
            {
                parse_mode: 'HTML'
            }
        )
    }

    public async sendStreamStart(chatId: string, stream: Stream & { user: User }) {
        await this.telegram.sendMessage(
            chatId,
            FUNCTIONS.streamStart(stream),
            { parse_mode: 'HTML' }
        )
    }

    public async sendEnable2FA(chatId: string) {
        await this.telegram.sendMessage(
            chatId,
            MESSAGES.enable2FA,
            { parse_mode: 'HTML' }
        )
    }

    private async connectToTelegram(userId: string, chatId: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                telegramChatId: chatId
            }
        })

        if (user) {
            await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    notificationSettings: {
                        update: {
                            telegramNotificationsEnable: false
                        }
                    }
                }
            })
            return false
        } else {

            await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    telegramChatId: chatId
                }
            })
        }
        return true
    }

    private async findUserByChatId(chatId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                telegramChatId: chatId
            },
            include: {
                followers: true,
                followings: true,
                userSecurity: true
            }
        })

        return user
    }
}
