import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChannelService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async findRecommended() {
        const channles = await this.prismaService.user.findMany({
            orderBy: {
                followers: {
                    _count: 'desc'
                }
            },
            include: {
                stream: true
            },
            take: 5
        })

        return channles
    }

    public async findByUsername(username: string) {
        const channel = await this.prismaService.user.findUnique({
            where: {
                username,
            },
            include: {
                socialLinks: {
                    orderBy: {
                        position: 'asc'
                    }
                },
                stream: {
                    include: {
                        category: true
                    }
                },
                followers: true
            }
        })

        if (!channel) {
            throw new NotFoundException('Канал не найден')
        }

        return channel
    }

    public async findFollowersCountByChannel(channelId: string) {
        const count = await this.prismaService.follow.count({
            where: {
                following: {
                    id: channelId
                }
            }
        })

        return count
    }
}