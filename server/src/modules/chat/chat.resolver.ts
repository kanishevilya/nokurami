/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { MessageModel } from './models/message.model';
import { PubSub } from 'graphql-subscriptions';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { SendMessageInput } from './inputs/send-message.input';
import { User } from '@/prisma/generated';
import { ChangeChatSettingsInput } from './inputs/change-chat-settings.input';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../libs/pub-sub/pub-sub.provider';

@Resolver('Chat')
export class ChatResolver {

  public constructor(
    private readonly chatService: ChatService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) { }

  @Query(() => [MessageModel], { name: 'findMessagesByStream' })
  public async findByStream(@Args('streamId') streamId: string) {
    return this.chatService.findByStreamId(streamId)
  }

  @Authorization()
  @Mutation(() => MessageModel, { name: 'sendMessage' })
  public async sendMessage(
    @Authorized('id') userId: string,
    @Args('data') input: SendMessageInput
  ) {
    const message = await this.chatService.sendMessage(userId, input)

    this.pubSub.publish('NEW_MESSAGE_ADDED', { newMessageAdded: message })

    return message
  }

  @Subscription(() => MessageModel, {
    name: 'newMessageAdded',
    filter: (payload, variables) =>
      payload.newMessageAdded.streamId === variables.streamId
  })
  public newMessageAdded(@Args('streamId') streamId: string) {
    return this.pubSub.asyncIterableIterator('NEW_MESSAGE_ADDED')
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeChatSettings' })
  public async changeSettings(
    @Authorized() user: User,
    @Args('data') input: ChangeChatSettingsInput
  ) {
    return this.chatService.changeSettings(user, input)
  }
}
