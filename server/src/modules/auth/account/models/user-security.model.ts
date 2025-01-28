import { UserSecurity } from "@/prisma/generated"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserSecurityModel implements UserSecurity {
    @Field(() => ID)
    id: string

    @Field(() => Boolean)
    isEmailVerified: boolean

    @Field(() => Boolean)
    isTwoFAEnabled: boolean

    @Field(() => String)
    twoFASecret: string

    @Field(() => String)
    userId: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

