
import { ChatSettings } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ChatSettingsModel implements ChatSettings {
    @Field(() => ID)
    id: string

    @Field(() => Boolean)
    isChatEnabled: boolean

    @Field(() => Boolean)
    isChatFollowersOnly: boolean

    @Field(() => Boolean)
    isChatSubscribersOnly: boolean

    @Field(() => String)
    streamId: string;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}