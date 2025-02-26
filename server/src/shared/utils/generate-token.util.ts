import { TokenType } from "@/prisma/generated";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { v4 } from 'uuid'
import { ms } from "./ms.util";


export async function GenerateToken(
    prismaService: PrismaService,
    userId: string,
    type: TokenType,
    additionalData: any = {}
) {
    const token = v4()

    const expiresIn = new Date(new Date().getTime() + ms('5minutes'))

    const existingToken = await prismaService.token.findFirst({
        where: {
            type,
            userId
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
            additionalData,
            user: {
                connect: {
                    id: userId
                }
            }
        },
        include: {
            user: {
                include: {
                    notificationSettings: true
                }
            }
        }
    })

    return newToken
}