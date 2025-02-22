import { Stream } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserModel } from "../../auth/account/models/user.model";
import { CategoryModel } from "../../category/models/category.model";
import { ChatSettingsModel } from "./chat-settings.model";

@ObjectType()
export class StreamModel implements Stream {
    @Field(() => ID)
    id: string

    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    previewUrl: string;

    @Field(() => String, { nullable: true })
    ingressId: string;

    @Field(() => String, { nullable: true })
    serverUrl: string;

    @Field(() => String, { nullable: true })
    streamKey: string;

    @Field(() => Boolean)
    isLive: boolean;

    @Field(() => ChatSettingsModel, { nullable: true })
    chatSettings: ChatSettingsModel

    @Field(() => UserModel)
    user: UserModel

    @Field(() => String)
    userId: string;

    @Field(() => String)
    categoryId: string;

    @Field(() => CategoryModel)
    category: CategoryModel;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}