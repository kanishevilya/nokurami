import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/generated';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().req;

        if (!roles) return true

        if (!roles.includes(request.user.role)) {
            throw new ForbiddenException(
                'Недостаточно прав. У вас нет прав доступа к этому ресурсу.'
            )
        }

        return true
    }
}
