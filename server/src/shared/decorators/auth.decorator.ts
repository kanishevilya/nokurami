import { applyDecorators, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../guards/gql-auth.guard";
import { UserRole } from "@/prisma/generated";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guard";


export function Authorization(...roles: UserRole[]) {
    if (roles.length > 0) {
        return applyDecorators(
            Roles(...roles),
            UseGuards(GqlAuthGuard, RolesGuard)
        )
    }

    return applyDecorators(UseGuards(GqlAuthGuard))
}