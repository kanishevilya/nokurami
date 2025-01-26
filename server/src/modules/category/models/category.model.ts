import { Category } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StreamModel } from "../../stream/models/stream.model";

@ObjectType()
export class CategoryModel implements Category {
    @Field(() => ID)
    id: string

    @Field(() => String)
    title: string;

    @Field(() => String)
    slug: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    previewUrl: string;

    @Field(() => [StreamModel])
    streams: StreamModel[]

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}