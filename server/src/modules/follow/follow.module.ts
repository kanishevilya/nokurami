import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { NotificationService } from '../notification/notification.service';
import { PubSubProvider } from '../libs/pub-sub/pub-sub.provider';
import { TelegramService } from '../libs/telegram/telegram.service';

@Module({
  providers: [FollowResolver, FollowService, NotificationService, PubSubProvider, TelegramService],
})
export class FollowModule { }
