import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ChatStatus, CreatePostInput, UpdatePostInput, CreateCommentInput, UpdateCommentInput, ToggleLikeInput, RequestChatInput, UpdateChatStatusInput, SendPrivateMessageInput, MarkMessagesAsReadInput, PostFiltersInput, PostSortInput } from '../types/social.types';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '@/src/modules/libs/pub-sub/pub-sub.provider';
import { PubSub } from 'graphql-subscriptions';


@Injectable()
export class SocialService {
    constructor(
        private prisma: PrismaService,
        @Inject(PUB_SUB) private pubSub: PubSub,
    ) { }

    // Posts
    async getPosts(filters?: PostFiltersInput, sort?: PostSortInput, skip = 0, take = 10) {
        const where: any = {
            isPublic: true,
        };

        if (filters?.followingOnly && filters?.userId) {
            // Get users that the current user follows
            const following = await this.prisma.follow.findMany({
                where: { followerId: filters.userId },
                select: { followingId: true },
            });

            const followingIds = following.map(f => f.followingId);
            where.authorId = { in: followingIds };
        }

        if (filters?.userId && !filters?.followingOnly) {
            where.authorId = filters.userId;
        }

        if (filters?.searchTerm) {
            where.content = {
                contains: filters.searchTerm,
                mode: 'insensitive',
            };
        }

        let orderBy: any = { createdAt: 'desc' };


        if (sort?.latestFirst === false) {
            orderBy = { createdAt: 'asc' };
        }

        const posts = await this.prisma.post.findMany({
            where,
            orderBy,
            skip,
            take,
            include: {
                author: true,
                comments: {
                    include: {
                        author: true,
                        likes: true
                    }
                },
                likes: true,
                _count: {
                    select: { likes: true, comments: true },
                },
            },
        });

        // Преобразуем counts в поля объекта
        return posts.map(post => ({
            ...post,
            likeCount: post._count.likes,
            commentCount: post._count.comments,
        }));
    }

    async getPostById(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                likes: {
                    include: { user: true },
                },
                comments: {
                    include: {
                        author: true,
                        likes: {
                            include: { user: true },
                        },
                        _count: {
                            select: { likes: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                _count: {
                    select: { likes: true, comments: true },
                },
            },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        // Преобразуем counts в поля объекта и добавляем likeCount для комментариев
        return {
            ...post,
            likeCount: post._count.likes,
            commentCount: post._count.comments,
            comments: post.comments.map(comment => ({
                ...comment,
                likeCount: comment._count.likes,
            })),
        };
    }

    async createPost(userId: string, input: CreatePostInput) {
        const post = await this.prisma.post.create({
            data: {
                content: input.content,
                imageUrl: input.imageUrl,
                isPublic: input.isPublic ?? true,
                author: {
                    connect: { id: userId },
                },
            },
            include: {
                author: true,
            },
        });

        // Публикуем событие для подписок
        this.pubSub.publish('postCreated', { postCreated: post });

        return post;
    }

    async updatePost(userId: string, input: UpdatePostInput) {
        const post = await this.prisma.post.findUnique({
            where: { id: input.id },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${input.id} not found`);
        }

        if (post.authorId !== userId) {
            throw new ForbiddenException('You are not authorized to update this post');
        }

        const updatedPost = await this.prisma.post.update({
            where: { id: input.id },
            data: {
                content: input.content !== undefined ? input.content : undefined,
                imageUrl: input.imageUrl !== undefined ? input.imageUrl : undefined,
                isPublic: input.isPublic !== undefined ? input.isPublic : undefined,
            },
            include: {
                author: true,
            },
        });

        return updatedPost;
    }

    async deletePost(userId: string, postId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found`);
        }

        if (post.authorId !== userId) {
            throw new ForbiddenException('You are not authorized to delete this post');
        }

        await this.prisma.post.delete({
            where: { id: postId },
        });

        return true;
    }

    // Comments
    async createComment(userId: string, input: CreateCommentInput) {
        const post = await this.prisma.post.findUnique({
            where: { id: input.postId },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${input.postId} not found`);
        }

        const comment = await this.prisma.comment.create({
            data: {
                content: input.content,
                post: {
                    connect: { id: input.postId },
                },
                author: {
                    connect: { id: userId },
                },
            },
            include: {
                author: true,
                post: true,
            },
        });

        // Публикуем событие для подписок
        this.pubSub.publish('commentCreated', { commentCreated: comment });

        return comment;
    }

    async updateComment(userId: string, input: UpdateCommentInput) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: input.id },
        });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${input.id} not found`);
        }

        if (comment.authorId !== userId) {
            throw new ForbiddenException('You are not authorized to update this comment');
        }

        const updatedComment = await this.prisma.comment.update({
            where: { id: input.id },
            data: {
                content: input.content,
            },
            include: {
                author: true,
                post: true,
            },
        });

        return updatedComment;
    }

    async deleteComment(userId: string, commentId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        if (comment.authorId !== userId) {
            throw new ForbiddenException('You are not authorized to delete this comment');
        }

        await this.prisma.comment.delete({
            where: { id: commentId },
        });

        return true;
    }

    // Likes
    async toggleLike(userId: string, input: ToggleLikeInput) {
        if (!input.postId && !input.commentId) {
            throw new Error('Either postId or commentId must be provided');
        }

        if (input.postId && input.commentId) {
            throw new Error('Only one of postId or commentId can be provided');
        }

        // Проверяем существование поста или комментария
        if (input.postId) {
            const post = await this.prisma.post.findUnique({
                where: { id: input.postId },
            });

            if (!post) {
                throw new NotFoundException(`Post with ID ${input.postId} not found`);
            }

            // Проверяем, есть ли уже лайк от этого пользователя
            const existingLike = await this.prisma.like.findFirst({
                where: {
                    userId,
                    postId: input.postId,
                },
            });

            if (existingLike) {
                // Если лайк уже есть, то удаляем его
                await this.prisma.like.delete({
                    where: { id: existingLike.id },
                });
                return { liked: false, entityId: input.postId, entityType: 'POST' };
            } else {
                // Если лайка нет, то создаем его
                const like = await this.prisma.like.create({
                    data: {
                        user: {
                            connect: { id: userId },
                        },
                        post: {
                            connect: { id: input.postId },
                        },
                    },
                });
                return { liked: true, entityId: input.postId, entityType: 'POST', likeId: like.id };
            }
        } else if (input.commentId) {
            const comment = await this.prisma.comment.findUnique({
                where: { id: input.commentId },
            });

            if (!comment) {
                throw new NotFoundException(`Comment with ID ${input.commentId} not found`);
            }

            // Проверяем, есть ли уже лайк от этого пользователя
            const existingLike = await this.prisma.like.findFirst({
                where: {
                    userId,
                    commentId: input.commentId,
                },
            });

            if (existingLike) {
                // Если лайк уже есть, то удаляем его
                await this.prisma.like.delete({
                    where: { id: existingLike.id },
                });
                return { liked: false, entityId: input.commentId, entityType: 'COMMENT' };
            } else {
                // Если лайка нет, то создаем его
                const like = await this.prisma.like.create({
                    data: {
                        user: {
                            connect: { id: userId },
                        },
                        comment: {
                            connect: { id: input.commentId },
                        },
                    },
                });
                return { liked: true, entityId: input.commentId, entityType: 'COMMENT', likeId: like.id };
            }
        }
    }

    // Private Chats
    async getPrivateChats(userId: string) {
        const chats = await this.prisma.privateChat.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { recipientId: userId },
                ],
            },
            include: {
                creator: true,
                recipient: true,
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });

        // Для каждого чата вычисляем количество непрочитанных сообщений
        return Promise.all(chats.map(async (chat) => {
            const unreadCount = await this.prisma.privateMessage.count({
                where: {
                    chatId: chat.id,
                    senderId: { not: userId },
                    isRead: false,
                },
            });

            return {
                ...chat,
                unreadCount,
            };
        }));
    }

    async getPrivateChatById(userId: string, chatId: string) {
        const chat = await this.prisma.privateChat.findUnique({
            where: { id: chatId },
            include: {
                creator: true,
                recipient: true,
                messages: {
                    include: {
                        sender: true,
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });


        if (!chat) {
            throw new NotFoundException(`Chat with ID ${chatId} not found`);
        }

        // Проверяем, что пользователь является участником чата
        if (chat.creatorId !== userId && chat.recipientId !== userId) {
            throw new ForbiddenException('You are not authorized to view this chat');
        }

        // Вычисляем количество непрочитанных сообщений
        const unreadCount = await this.prisma.privateMessage.count({
            where: {
                chatId: chat.id,
                senderId: { not: userId },
                isRead: false,
            },
        });


        return {
            ...chat,
            unreadCount,
        };
    }

    async requestChat(userId: string, input: RequestChatInput) {
        const existingChat = await this.prisma.privateChat.findFirst({
            where: {
                OR: [
                    {
                        creatorId: userId,
                        recipientId: input.recipientId,
                    },
                    {
                        creatorId: input.recipientId,
                        recipientId: userId,
                    },
                ],
            },
            include: {
                creator: true,
                recipient: true,
            },
        });

        if (existingChat) {
            return existingChat;
        }

        // Создаем новый чат
        const chat = await this.prisma.privateChat.create({
            data: {
                creator: {
                    connect: { id: userId },
                },
                recipient: {
                    connect: { id: input.recipientId },
                },
                status: ChatStatus.PENDING,
            },
            include: {
                creator: true,
                recipient: true,
            },
        });

        // Публикуем событие для подписок
        this.pubSub.publish('chatRequested', {
            chatRequested: {
                ...chat,
                unreadCount: 0,
            }
        });

        return chat;
    }

    async updateChatStatus(userId: string, input: UpdateChatStatusInput) {
        const chat = await this.prisma.privateChat.findUnique({
            where: { id: input.chatId },
            include: {
                creator: true,
                recipient: true,
            },
        });

        if (!chat) {
            throw new NotFoundException(`Chat with ID ${input.chatId} not found`);
        }

        // Только получатель запроса может изменить статус
        if (chat.recipientId !== userId) {
            throw new ForbiddenException('Only the recipient can update the chat status');
        }

        const updatedChat = await this.prisma.privateChat.update({
            where: { id: input.chatId },
            data: {
                status: input.status,
            },
            include: {
                creator: true,
                recipient: true,
            },
        });

        // Публикуем событие для подписок
        this.pubSub.publish('chatStatusUpdated', {
            chatStatusUpdated: {
                ...updatedChat,
                unreadCount: 0,
            }
        });

        return updatedChat;
    }

    async sendPrivateMessage(userId: string, input: SendPrivateMessageInput) {
        const chat = await this.prisma.privateChat.findUnique({
            where: { id: input.chatId },
        });

        if (!chat) {
            throw new NotFoundException(`Chat with ID ${input.chatId} not found`);
        }

        // Проверяем, что пользователь является участником чата
        if (chat.creatorId !== userId && chat.recipientId !== userId) {
            throw new ForbiddenException('You are not authorized to send messages in this chat');
        }

        // Проверяем, что чат принят
        if (chat.status !== ChatStatus.ACCEPTED) {
            throw new ForbiddenException('Cannot send messages in a chat that is not accepted');
        }

        const message = await this.prisma.privateMessage.create({
            data: {
                content: input.content,
                chat: {
                    connect: { id: input.chatId },
                },
                sender: {
                    connect: { id: userId },
                },
                isRead: false,
            },
            include: {
                sender: true,
                chat: {
                    include: {
                        creator: true,
                        recipient: true,
                    },
                },
            },
        });

        // Публикуем событие для подписок
        console.log("MESSAGE:", message);
        this.pubSub.publish('privateMessageSent', { privateMessageSent: message });
        this.pubSub.publish(`chatMessages:${input.chatId}`, { onChatMessage: message });

        return message;
    }

    async markMessagesAsRead(userId: string, input: MarkMessagesAsReadInput) {
        const chat = await this.prisma.privateChat.findUnique({
            where: { id: input.chatId },
        });

        if (!chat) {
            throw new NotFoundException(`Chat with ID ${input.chatId} not found`);
        }

        // Проверяем, что пользователь является участником чата
        if (chat.creatorId !== userId && chat.recipientId !== userId) {
            throw new ForbiddenException('You are not authorized to mark messages in this chat');
        }

        // Помечаем все сообщения от другого пользователя как прочитанные
        const result = await this.prisma.privateMessage.updateMany({
            where: {
                chatId: input.chatId,
                senderId: { not: userId },
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });

        return {
            success: true,
            count: result.count
        };
    }

    // Подписки
    onPostCreated() {
        return this.pubSub.asyncIterableIterator('postCreated');
    }

    onCommentCreated() {
        return this.pubSub.asyncIterableIterator('commentCreated');
    }

    onChatRequested() {
        return this.pubSub.asyncIterableIterator('chatRequested');
    }

    onChatStatusUpdated() {
        return this.pubSub.asyncIterableIterator('chatStatusUpdated');
    }

    onPrivateMessageSent() {
        return this.pubSub.asyncIterableIterator('privateMessageSent');
    }

    onChatMessage(chatId: string) {
        console.log(chatId);
        return this.pubSub.asyncIterableIterator(`chatMessages:${chatId}`);
    }
} 