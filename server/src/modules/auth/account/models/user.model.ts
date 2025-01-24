import { User, UserRole } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { SocialLinkModel } from "../../profile/models/social-link.model";

@ObjectType()
export class UserModel implements User {
    @Field(() => ID)
    id: string

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string

    @Field(() => String)
    username: string

    @Field(() => String)
    displayName: string

    @Field(() => String, { nullable: true })
    avatar: string

    @Field(() => String, { nullable: true })
    information: string

    @Field(() => Boolean)
    isEmailVerified: boolean;

    @Field(() => String)
    twoFASecret: string;

    @Field(() => Boolean)
    isTwoFAEnabled: boolean;

    @Field(() => String)
    role: UserRole;

    @Field(() => [SocialLinkModel])
    socialLinks: SocialLinkModel[]

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}