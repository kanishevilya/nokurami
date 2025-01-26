import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async findAll() {
        const categories = await this.prismaService.category.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                streams: {
                    include: {
                        user: true,
                        category: true,
                    }
                }
            }
        })

        return categories
    }

    public async findRandom() {
        const total = await this.prismaService.category.count()
        if (total <= 7) return await this.prismaService.category.findMany()
        const randomIndexes = new Set<number>()
        while (randomIndexes.size < 7) {
            const randomIndex = Math.floor(Math.random() * total)
            randomIndexes.add(randomIndex)
        }

        const categories = await this.prismaService.category.findMany({
            take: total,
            skip: 0,
            include: {
                streams: {
                    include: {
                        user: true,
                        category: true,
                    }
                }
            }
        })

        return Array.from(randomIndexes).map(index => categories[index])
    }

    public async findBySlug(slug: string) {
        const category = await this.prismaService.category.findUnique({
            where: {
                slug
            },
            include: {
                streams: {
                    include: {
                        user: true,
                        category: true
                    }
                }
            }
        })

        if (!category) {
            throw new NotFoundException("Категория не найдена")
        }

        return category
    }
}
