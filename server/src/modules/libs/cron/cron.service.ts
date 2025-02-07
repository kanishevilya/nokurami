import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { TelegramService } from '../telegram/telegram.service'

@Injectable()
export class CronService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly telegramService: TelegramService,
	) { }

	@Cron(CronExpression.EVERY_WEEK)
	public async notifyUsersEnableTwoFactor() {
		const users = await this.prismaService.user.findMany({
			where: {
				userSecurity: {
					isTwoFAEnabled: false
				}
			},
			include: {
				notificationSettings: true
			}
		})

		for (const user of users) {

			if (
				user.notificationSettings.telegramNotificationsEnable &&
				user.telegramChatId
			) {
				await this.telegramService.sendEnable2FA(user.telegramChatId)
			}
		}
	}
}
