import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CronService } from './cron.service'
import { TelegramService } from '../telegram/telegram.service'

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [CronService, TelegramService]
})
export class CronModule { }
