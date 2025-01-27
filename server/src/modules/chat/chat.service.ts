import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SendMessageInput } from './inputs/send-message.input';
import { User } from '@/prisma/generated';

@Injectable()
export class ChatService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async findByStreamId(streamId: string) {
        const messages = await this.prismaService.message.findMany({
            where: {
                streamId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        })

        return messages
    }

    public async sendMessage(userId: string, input: SendMessageInput) {
        const { text, streamId } = input

        const stream = await this.prismaService.stream.findUnique({
            where: {
                id: streamId
            }
        })

        if (!stream) {
            throw new NotFoundException('Стрим не найден')
        }

        if (!stream.isLive) {
            throw new BadRequestException('Стрим не в сети')
        }

        const message = await this.prismaService.message.create({
            data: {
                text,
                user: {
                    connect: {
                        id: userId
                    }
                },
                stream: {
                    connect: {
                        id: stream.id
                    }
                }
            },
            include: {
                stream: true,
                user: true
            }
        })

        return message
    }

    public async changeSettings(user: User, input: ChangeChatSettingsInput) {
        const {
            isChatEnabled,
            isChatFollowersOnly,
            isChatSubscribersOnly
        } = input

        await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                isChatEnabled,
                isChatFollowersOnly,
                isChatSubscribersOnly
            }
        })

        return true
    }
}
