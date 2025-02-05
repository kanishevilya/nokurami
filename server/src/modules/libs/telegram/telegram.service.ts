import { TokenType } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import MESSAGES from './messages';

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

            await this.connectToTelegram(telegramToken.userId, chatId)

            await this.prismaService.token.delete({
                where: {
                    id: telegramToken.id,
                    type: TokenType.TELEGRAM_AUTHENTICATION
                }
            })

            await ctx.replyWithHTML(MESSAGES.authSuccess)
        } else {
            const user = await this.findUserByChatId(chatId)

            if (user) {
                await this.onMeCommand(ctx)
            } else {
                await ctx.replyWithHTML(MESSAGES.welcome)
            }
        }
    }

    @Command("me")
    @Action('me')
    public async onMeCommand(@Ctx() ctx: any) {
        const chatId = ctx.chat.id.toString()

        const user = await this.findUserByChatId(chatId)

        await ctx.replyWithHTML(`Email пользователя:\r\n${user.email}`)
    }

    private async connectToTelegram(userId: string, chatId: string) {
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                telegramChatId: chatId
            }
        })
    }

    private async findUserByChatId(chatId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                telegramChatId: chatId
            },
            include: {
                followers: true,
                followings: true
            }
        })

        return user
    }
}
