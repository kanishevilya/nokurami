import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FollowService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async findFollowersByUserId(userId: string) {
        const followers = await this.prismaService.follow.findMany({
            where: {
                followingId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                follower: true
            }
        })

        return followers
    }

    public async findFollowingsByUserId(userId: string) {
        const followings = await this.prismaService.follow.findMany({
            where: {
                followerId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                following: true
            }
        })

        return followings
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
                following: true
            }
        })

        return follow
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
