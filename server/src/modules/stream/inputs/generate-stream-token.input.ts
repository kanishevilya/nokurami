import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GenerateStreamTokenInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    userId: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    channelId: string
}