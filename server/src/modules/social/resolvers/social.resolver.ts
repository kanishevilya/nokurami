import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../shared/guards/gql-auth.guard';
import { Authorized } from '../../../shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { SocialService } from '../services/social.service';
import {
    PostModel,
    CommentModel,
    PrivateChatModel,
    PrivateMessageModel,
    CreatePostInput,
    UpdatePostInput,
    CreateCommentInput,
    UpdateCommentInput,
    ToggleLikeInput,
    RequestChatInput,
    UpdateChatStatusInput,
    SendPrivateMessageInput,
    MarkMessagesAsReadInput,
    MarkMessagesAsReadResponse,
    PostFiltersInput,
    PostSortInput,
} from '../types/social.types';
import { Authorization } from '@/src/shared/decorators/auth.decorator';

@Resolver(() => PostModel)
export class SocialResolver {
    constructor(private socialService: SocialService) { }

    // Запросы для постов
    @Query(() => [PostModel], { name: 'findPosts' })
    @UseGuards(GqlAuthGuard)
    async posts(
        @Args('filters', { nullable: true }) filters?: PostFiltersInput,
        @Args('sort', { nullable: true }) sort?: PostSortInput,
        @Args('skip', { nullable: true, type: () => Number }) skip?: number,
        @Args('take', { nullable: true, type: () => Number }) take?: number,
    ) {
        return this.socialService.getPosts(filters, sort, skip, take);
    }

    @Query(() => PostModel, { name: 'findPostById' })
    @Authorization()
    async post(@Args('id') id: string) {
        return this.socialService.getPostById(id);
    }

    @Mutation(() => PostModel, { name: 'createPost' })
    @Authorization()
    async createPost(
        @Authorized() user: User,
        @Args('input') input: CreatePostInput,
    ) {
        return this.socialService.createPost(user.id, input);
    }

    @Mutation(() => PostModel, { name: 'updatePost' })
    @Authorization()
    async updatePost(
        @Authorized() user: User,
        @Args('input') input: UpdatePostInput,
    ) {
        return this.socialService.updatePost(user.id, input);
    }

    @Mutation(() => Boolean, { name: 'deletePost' })
    @Authorization()
    async deletePost(
        @Authorized() user: User,
        @Args('id') id: string,
    ) {
        return this.socialService.deletePost(user.id, id);
    }

    // Запросы для комментариев
    @Mutation(() => CommentModel, { name: 'createComment' })
    @Authorization()
    async createComment(
        @Authorized() user: User,
        @Args('input') input: CreateCommentInput,
    ) {
        return this.socialService.createComment(user.id, input);
    }

    @Mutation(() => CommentModel, { name: 'updateComment' })
    @Authorization()
    async updateComment(
        @Authorized() user: User,
        @Args('input') input: UpdateCommentInput,
    ) {
        return this.socialService.updateComment(user.id, input);
    }

    @Mutation(() => Boolean)
    @Authorization()
    async deleteComment(
        @Authorized() user: User,
        @Args('id') id: string,
    ) {
        return this.socialService.deleteComment(user.id, id);
    }

    // Запросы для лайков
    @Mutation(() => Boolean, { name: 'toggleLike' })
    @Authorization()
    async toggleLike(
        @Authorized() user: User,
        @Args('input') input: ToggleLikeInput,
    ) {
        const result = await this.socialService.toggleLike(user.id, input);
        return result.liked;
    }

    // Запросы для приватных чатов
    @Query(() => [PrivateChatModel], { name: 'privateChats' })
    @Authorization()
    async privateChats(@Authorized() user: User) {
        return this.socialService.getPrivateChats(user.id);
    }

    @Query(() => PrivateChatModel, { name: 'privateChat' })
    @Authorization()
    async privateChat(
        @Authorized() user: User,
        @Args('id') id: string,
    ) {
        return this.socialService.getPrivateChatById(user.id, id);
    }

    @Mutation(() => PrivateChatModel, { name: 'requestChat' })
    @Authorization()
    async requestChat(
        @Authorized() user: User,
        @Args('input') input: RequestChatInput,
    ) {
        return this.socialService.requestChat(user.id, input);
    }

    @Mutation(() => PrivateChatModel, { name: 'updateChatStatus' })
    @Authorization()
    async updateChatStatus(
        @Authorized() user: User,
        @Args('input') input: UpdateChatStatusInput,
    ) {
        return this.socialService.updateChatStatus(user.id, input);
    }

    @Mutation(() => PrivateMessageModel, { name: 'sendPrivateMessage' })
    @Authorization()
    async sendPrivateMessage(
        @Authorized() user: User,
        @Args('input') input: SendPrivateMessageInput,
    ) {
        return this.socialService.sendPrivateMessage(user.id, input);
    }

    @Mutation(() => MarkMessagesAsReadResponse, { name: 'markMessagesAsRead' })
    @Authorization()
    async markMessagesAsRead(
        @Authorized() user: User,
        @Args('input') input: MarkMessagesAsReadInput,
    ) {
        return this.socialService.markMessagesAsRead(user.id, input);
    }

    // Подписки
    @Subscription(() => PostModel, { name: 'postCreated' })
    postCreated() {
        return this.socialService.onPostCreated();
    }

    @Subscription(() => CommentModel, { name: 'commentCreated' })
    commentCreated() {
        return this.socialService.onCommentCreated();
    }

    @Subscription(() => PrivateChatModel, {
        name: 'chatRequested',
        filter: (payload: any, variables: any, context: any) => {
            const userId = context.req.user?.id;
            if (!userId) return false;

            const chat = payload.chatRequested;
            return chat.recipientId === userId; // Только получатель запроса получает уведомление
        },
    })
    chatRequested() {
        return this.socialService.onChatRequested();
    }

    @Subscription(() => PrivateChatModel, {
        name: 'chatStatusUpdated',
        filter: (payload: any, variables: any, context: any) => {
            const userId = context.req.user?.id;
            if (!userId) return false;

            const chat = payload.chatStatusUpdated;
            return chat.creatorId === userId; // Только создатель чата получает уведомление об изменении статуса
        },
    })
    chatStatusUpdated() {
        return this.socialService.onChatStatusUpdated();
    }

    @Subscription(() => PrivateMessageModel, {
        name: 'privateMessageSent',
        filter: (payload: any, variables: any, context: any) => {
            const userId = context.req.user?.id;
            if (!userId) return false;

            const message = payload.privateMessageSent;
            const chat = message.chat;

            // Сообщение получает другой участник чата (не отправитель)
            return (chat.creatorId === userId || chat.recipientId === userId) && message.senderId !== userId;
        },
    })
    privateMessageSent() {
        return this.socialService.onPrivateMessageSent();
    }

    @Subscription(() => PrivateMessageModel, {
        name: 'onChatMessage',
        filter: (payload: any, variables: any, context: any) => {
            const userId = context.req.user?.id;
            if (!userId) return false;

            // Проверяем, что пользователь является участником чата
            const chat = payload.onChatMessage.chat;
            return chat.creatorId === userId || chat.recipientId === userId;
        },
    })
    onChatMessage(
        @Args('chatId') chatId: string,
    ) {
        return this.socialService.onChatMessage(chatId);
    }
} 