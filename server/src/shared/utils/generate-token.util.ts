import { TokenType, User } from "@/prisma/generated";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { v4 } from 'uuid'
import { ms } from "./ms.util";


export async function GenerateToken(
    prismaService: PrismaService,
    user: User,
    type: TokenType
) {
    const token = v4()

    const expiresIn = new Date(new Date().getTime() + ms('5minutes'))

    const existingToken = await prismaService.token.findFirst({
        where: {
            type,
            userId: user.id
        }
    })

    if (existingToken) {
        await prismaService.token.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const newToken = await prismaService.token.create({
        data: {
            token,
            expiresIn,
            type,
            user: {
                connect: {
                    id: user.id
                }
            }
        },
        include: {
            user: true
        }
    })

    return newToken
}