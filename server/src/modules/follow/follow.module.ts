import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { NotificationService } from '../notification/notification.service';

@Module({
  providers: [FollowResolver, FollowService, NotificationService],
})
export class FollowModule { }
