/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { NotificationModel } from './models/notification.model';
import { ChangeNotificationsSettingsResponse } from './models/notification-settings.model';
import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@/prisma/generated';

@Resolver('Notification')
export class NotificationResolver {
  private readonly pubSub: PubSub

  constructor(
    private readonly notificationService: NotificationService,
  ) { this.pubSub = new PubSub() }

  @Subscription(() => NotificationModel, {
    name: 'newNotificationAdded',
    filter: (payload, variables) =>
      payload.newNotificationAdded.userId === variables.userId,
  })
  public newNotificationAdded(@Args("userId") userId: string) {
    return this.notificationService.newNotificationAdded();
  }

  @Authorization()
  @Query(() => Number, { name: "findUnreadNotificationsCount" })
  public async findUnreadNotificationsCount(@Authorized() user: User) {
    return this.notificationService.findUnreadNotificationsCount(user.id)
  }

  @Authorization()
  @Query(() => [NotificationModel], { name: "findNotificationsByUserId" })
  public async findByUserId(@Authorized("id") userId: string) {
    return this.notificationService.findByUserId(userId)
  }

  @Authorization()
  @Mutation(() => ChangeNotificationsSettingsResponse, { name: "changeNotificationSettings" })
  public async changeNotificationSettings(@Authorized("id") userId: string, @Args("data") input: ChangeNotificationsSettingsInput) {
    return this.notificationService.changeNotificationSettings(userId, input)
  }
}
