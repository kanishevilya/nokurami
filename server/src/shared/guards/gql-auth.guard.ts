import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';



@Injectable()
export class GqlAuthGuard implements CanActivate {
    public constructor(private readonly prismaService: PrismaService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)

        const request = ctx.getContext().req;

        if (typeof request.session.userId === "undefined") {
            throw new UnauthorizedException(
                'Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ.'
            )
        }
        const user = await this.prismaService.user.findUnique({
            where: {
                id: request.session.userId
            }
        })

        request.user = user

        return true
    }
}
