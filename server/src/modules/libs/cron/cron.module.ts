import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CronService } from './cron.service'
import { TelegramService } from '../telegram/telegram.service'
import { NotificationService } from '../../notification/notification.service'
import { PubSubProvider } from '../pub-sub/pub-sub.provider'

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [CronService, TelegramService, NotificationService, PubSubProvider]
})
export class CronModule { }
