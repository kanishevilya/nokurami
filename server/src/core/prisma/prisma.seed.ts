import { BadRequestException, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "../../../prisma/generated";
import { CATEGORIES } from "./data/categories.data";
import { USERNAMES } from "./data/usernames.data";
import { STREAMS_TITLES } from "./data/streams.data";
import { hash } from "argon2";


const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    }
})

async function main() {
    try {
        Logger.log("Начало заполнения бд")

        await prisma.$transaction([
            prisma.user.deleteMany(),
            prisma.userSecurity.deleteMany(),
            prisma.socialLink.deleteMany(),
            prisma.stream.deleteMany(),
            prisma.chatSettings.deleteMany(),
            prisma.notification.deleteMany(),
            prisma.notificationSettings.deleteMany(),
            prisma.category.deleteMany()
        ])

        await prisma.category.createMany({
            data: CATEGORIES
        })
        Logger.log('Категории успешно созданы')

        const categories = await prisma.category.findMany()

        const categoriesBySlug = Object.fromEntries(
            categories.map(category => [category.slug, category])
        )

        await prisma.$transaction(async tx => {
            for (const username of USERNAMES) {
                const randomCategory =
                    categoriesBySlug[
                    Object.keys(categoriesBySlug)[
                    Math.floor(
                        Math.random() *
                        Object.keys(categoriesBySlug).length
                    )
                    ]
                    ]

                const userExists = await tx.user.findUnique({
                    where: {
                        username
                    }
                })

                if (!userExists) {
                    const createdUser = await tx.user.create({
                        data: {
                            email: `${username}@example.com`,
                            password: await hash('12345678'),
                            username,
                            displayName: username,
                            avatar: `/channels/${username}.webp`,
                            userSecurity: {
                                create: {
                                    isEmailVerified: true,
                                }
                            },
                            notificationSettings: {
                                create: {}
                            },
                            socialLinks: {
                                createMany: {
                                    data: [
                                        {
                                            title: "Telegram",
                                            url: `https://t.me/${username}`,
                                            position: 1
                                        },
                                        {
                                            title: "Discord",
                                            url: `https://discord.com/invite/${username}`,
                                            position: 2
                                        },
                                        {
                                            title: "Youtube",
                                            url: `https://youtube.com/@${username}`,
                                            position: 3
                                        },
                                    ]
                                }
                            }
                        }
                    })

                    const randomTitles = STREAMS_TITLES[randomCategory.slug]
                    const randomTitle = randomTitles[
                        Math.floor(Math.random() * randomTitles.length)
                    ]

                    await tx.stream.create({
                        data: {
                            title: randomTitle,
                            previewUrl: `/streams/${username}.webp`,
                            user: {
                                connect: {
                                    id: createdUser.id
                                }
                            },
                            category: {
                                connect: {
                                    id: randomCategory.id
                                }
                            },
                            chatSettings: {
                                create: {}
                            }
                        }
                    })

                    Logger.log(`Пользователь ${createdUser.username} и стрим созданы`)
                }
            }
        })

        Logger.log(`База данных успешно заполнена`)

    } catch (error) {
        Logger.error(error)
        throw new BadRequestException("Ошибка при заполнении базы данных")
    } finally {
        Logger.log('Дисконект с базой данных...')
        await prisma.$disconnect()
        Logger.log('Соединение закрыто')
    }
}

main()