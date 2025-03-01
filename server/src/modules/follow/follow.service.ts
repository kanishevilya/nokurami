import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { TelegramService } from '../libs/telegram/telegram.service';
import { FindFollowersInput } from './inputs/find-followers.input';

@Injectable()
export class FollowService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly notificationService: NotificationService,
        private readonly telegramService: TelegramService
    ) { }

    public async findFollowersByUserId(userId: string, input: FindFollowersInput = {}) {
        const { search, skip, take, orderBy } = input;

        const orderByOptions: any[] = [];
        if (orderBy?.username) {
            orderByOptions.push({ follower: { username: orderBy.username } });
        }
        if (orderBy?.createdAt) {
            orderByOptions.push({ createdAt: orderBy.createdAt });
        }
        if (orderByOptions.length === 0) {
            orderByOptions.push({ createdAt: 'desc' });
        }

        const followers = await this.prismaService.follow.findMany({
            where: {
                followingId: userId,
                ...(search && {
                    follower: {
                        username: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                }),
            },
            orderBy: orderByOptions,
            skip: skip ?? 0,
            take: take ?? 10,
            include: {
                follower: true,
            },
        });

        const totalCount = await this.prismaService.follow.count({
            where: {
                followingId: userId,
                ...(search && {
                    follower: {
                        username: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                }),
            },
        });

        return { followers, totalCount };
    }

    public async findFollowingsByUserId(userId: string, input: FindFollowersInput = {}) {
        const { search, skip, take, orderBy } = input;

        const orderByOptions: any[] = [];
        if (orderBy?.username) {
            orderByOptions.push({ following: { username: orderBy.username } });
        }
        if (orderBy?.createdAt) {
            orderByOptions.push({ createdAt: orderBy.createdAt });
        }
        if (orderByOptions.length === 0) {
            orderByOptions.push({ createdAt: 'desc' });
        }

        const followings = await this.prismaService.follow.findMany({
            where: {
                followerId: userId,
                ...(search && {
                    following: {
                        username: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                }),
            },
            orderBy: orderByOptions,
            skip: skip ?? 0,
            take: take ?? 10,
            include: {
                following: {
                    include: {
                        stream: {
                            include: {
                                user: true,
                                category: true
                            }
                        }
                    }
                },
            },
        });

        const totalCount = await this.prismaService.follow.count({
            where: {
                followerId: userId,
                ...(search && {
                    following: {
                        username: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                }),
            },
        });

        return { followings, totalCount };
    }

    public async follow(userId: string, channelId: string) {
        const channel = await this.prismaService.user.findUnique({
            where: {
                id: channelId
            }
        })

        if (!channel) {
            throw new NotFoundException('Канал не найден')
        }

        if (channel.id === userId) {
            throw new ConflictException('Нельзя подписаться на себя')
        }

        const existingFollow = await this.prismaService.follow.findFirst({
            where: {
                followerId: userId,
                followingId: channel.id
            }
        })

        if (existingFollow) {
            throw new ConflictException('Вы уже подписаны на этот канал')
        }

        const follow = await this.prismaService.follow.create({
            data: {
                followerId: userId,
                followingId: channel.id
            },
            include: {
                follower: true,
                following: {
                    include: {
                        notificationSettings: true
                    }
                }
            }
        })

        if (follow.following.notificationSettings.siteNotificationsEnable) {
            await this.notificationService.createNewFollower(channel.id, follow.follower)
        }


        if (
            follow.following.notificationSettings.telegramNotificationsEnable &&
            follow.following.telegramChatId
        ) {
            await this.telegramService.sendNewFollower(
                follow.following.telegramChatId,
                follow.follower
            )
        }

        return true
    }

    public async unfollow(userId: string, channelId: string) {
        const channel = await this.prismaService.user.findUnique({
            where: {
                id: channelId
            }
        })

        if (!channel) {
            throw new NotFoundException('Канал не найден')
        }

        if (channel.id === userId) {
            throw new ConflictException('Нельзя отписаться на себя')
        }

        const existingFollow = await this.prismaService.follow.findFirst({
            where: {
                followerId: userId,
                followingId: channel.id
            }
        })

        if (!existingFollow) {
            throw new ConflictException('Вы не подписаны на этот канал')
        }

        await this.prismaService.follow.delete({
            where: {
                id: existingFollow.id,
                followerId: userId,
                followingId: channel.id
            }
        })

        return true
    }
}
