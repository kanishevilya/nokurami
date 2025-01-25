import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FiltersInput } from './inputs/filters.input';
import { Prisma, User } from '@prisma/generated';
import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';

@Injectable()
export class StreamService {
    public constructor(private readonly prismaService: PrismaService) { }

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
                user: true
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
                user: true
            },
            take: total,
            skip: 0,
        })

        return Array.from(randomIndexes).map(index => streams[index])
    }

    public async changeInfo(user: User, input: ChangeStreamInfoInput) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { title, categoryId } = input

        await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                title
            }
        })

        return true
    }

    private async findByUserId(user: User) {
        const stream = await this.prismaService.stream.findMany({
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
