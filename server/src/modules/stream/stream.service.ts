import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FiltersInput } from './inputs/filters.input';
import { Prisma, User } from '@prisma/generated';
import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'livekit-server-sdk';
import * as Upload from "graphql-upload/Upload.js"
import * as sharp from 'sharp'
import { MinioStorageService } from '../libs/minio-storage/minio-storage.service';
@Injectable()
export class StreamService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly minioStorageService: MinioStorageService
    ) { }

    public async findAll(input: FiltersInput = {}) {
        const { take, skip, searchKey } = input

        const whereClause = searchKey ? this.findBySearchKeyFilter(searchKey) : undefined

        const streams = await this.prismaService.stream.findMany({
            take: take ?? 15,
            skip: skip ?? 0,
            where: {
                ...whereClause
            },
            include: {
                user: true,
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return streams
    }

    public async findRandom() {
        const total = await this.prismaService.stream.count()
        if (total <= 4) return await this.prismaService.stream.findMany()
        const randomIndexes = new Set<number>()
        while (randomIndexes.size < 4) {
            const randomIndex = Math.floor(Math.random() * total)
            randomIndexes.add(randomIndex)
        }

        const streams = await this.prismaService.stream.findMany({
            include: {
                user: true,
                category: true
            },
            take: total,
            skip: 0,
        })

        return Array.from(randomIndexes).map(index => streams[index])
    }

    public async changeInfo(user: User, input: ChangeStreamInfoInput) {
        const { title, categoryId } = input

        await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                title,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return true
    }


    public async changePreview(user: User, file: Upload) {
        const stream = await this.findByUserId(user)

        if (stream.previewUrl) {
            await this.minioStorageService.remove(stream.previewUrl)
        }

        const chunks: Buffer[] = []

        for await (const chunk of file.createReadStream()) {
            chunks.push(chunk)
        }

        const buffer = Buffer.concat(chunks)

        const fileName = `/streams/${user.username}.webp`

        if (file.filename && file.filename.endsWith('.gif')) {
            const processedBuffer = await sharp(buffer, { animated: true })
                .resize(1280, 720)
                .webp()
                .toBuffer()

            await this.minioStorageService.upload(
                processedBuffer,
                fileName,
                'image/webp'
            )
        } else {
            const processedBuffer = await sharp(buffer)
                .resize(1280, 720)
                .webp()
                .toBuffer()

            await this.minioStorageService.upload(
                processedBuffer,
                fileName,
                'image/webp'
            )
        }

        await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                previewUrl: fileName
            }
        })

        return true
    }

    public async removePreview(user: User) {
        const stream = await this.findByUserId(user)

        if (!stream.previewUrl) {
            return
        }

        await this.minioStorageService.remove(stream.previewUrl)

        await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                previewUrl: null
            }
        })

        return true
    }

    public async generateStreamToken(input: GenerateStreamTokenInput) {
        const { userId, channelId } = input

        let self: { id: string, username: string }

        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })

        if (user) {
            self = { id: user.id, username: user.username }
        } else {
            self = {
                id: userId,
                username: `User ${Math.floor(Math.random() * 100000)}`
            }
        }

        const channel = await this.prismaService.user.findUnique({
            where: {
                id: channelId
            }
        })

        if (!channel) {
            throw new NotFoundException("Канал не найден")
        }

        const isHost = self.id === channel.id

        const token = new AccessToken(
            this.configService.getOrThrow<string>('LIVEKIT_API_KEY'),
            this.configService.getOrThrow<string>('LIVEKIT_API_SECRET'), {
            identity: isHost ? `Host-${self.id}` : self.id,
            name: self.username
        }
        )

        token.addGrant({
            room: channel.id,
            roomJoin: true,
            canPublish: false
        })

        return { token: token.toJwt() }
    }

    private async findByUserId(user: User) {
        const stream = await this.prismaService.stream.findUnique({
            where: {
                userId: user.id
            }
        })

        if (!stream) throw new NotFoundException("Стрим не найден")

        return stream
    }

    private findBySearchKeyFilter(searchKey: string): Prisma.StreamWhereInput {
        return {
            OR: [
                {
                    title: {
                        contains: searchKey,
                        mode: 'insensitive'
                    }
                },
                {
                    user: {
                        username: {
                            contains: searchKey,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        }
    }
}
