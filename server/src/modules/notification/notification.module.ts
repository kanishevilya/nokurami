import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PubSubProvider } from '../libs/pub-sub/pub-sub.provider';

@Module({
  providers: [NotificationResolver, NotificationService, PubSubProvider],
  exports: [NotificationService],
})
export class NotificationModule { }
