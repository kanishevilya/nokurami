import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetResolver } from './password-reset.resolver';
import { TelegramService } from '../../libs/telegram/telegram.service';

@Module({
  providers: [PasswordResetResolver, PasswordResetService, TelegramService],
})
export class PasswordResetModule { }
