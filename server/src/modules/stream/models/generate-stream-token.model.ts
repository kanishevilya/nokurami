import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GenerateStreamTokenModel {
    @Field(() => String)
    token: string;
}