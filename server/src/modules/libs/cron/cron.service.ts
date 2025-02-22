import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { TelegramService } from '../telegram/telegram.service'
import { MailService } from '../mail/mail.service'
import { NotificationService } from '../../notification/notification.service'

@Injectable()
export class CronService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly telegramService: TelegramService,
		private readonly notificationService: NotificationService,
	) { }

	@Cron(CronExpression.EVERY_WEEK)
	// @Cron(CronExpression.EVERY_10_SECONDS)
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

			if (user.email == "kanishevilya1@gmail.com") {
				await this.mailService.sendEnable2FA(user.email)
			}

			if (user.notificationSettings.siteNotificationsEnable) {
				await this.notificationService.createEnableTwoFactor(user.id)
			}


			if (
				user.notificationSettings.telegramNotificationsEnable &&
				user.telegramChatId
			) {
				await this.telegramService.sendEnable2FA(user.telegramChatId)
			}
		}
	}
}
