import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FiltersInput } from './inputs/filters.input';
import { Prisma } from '@prisma/generated';

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
            }
        })

        return streams
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
