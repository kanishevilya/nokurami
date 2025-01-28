import { User, UserRole } from "@/prisma/generated";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { SocialLinkModel } from "../../profile/models/social-link.model";
import { StreamModel } from "@/src/modules/stream/models/stream.model";
import { FollowModel } from "@/src/modules/follow/models/follow.model";
import { UserSecurityModel } from "./user-security.model";


registerEnumType(UserRole, {
    name: 'UserRole'
})

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

    @Field(() => UserSecurityModel)
    userSecurity: UserSecurityModel

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => [SocialLinkModel])
    socialLinks: SocialLinkModel[]


    @Field(() => [FollowModel])
    public followers: FollowModel[]

    @Field(() => [FollowModel])
    public followings: FollowModel[]


    @Field(() => StreamModel)
    stream: StreamModel

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}