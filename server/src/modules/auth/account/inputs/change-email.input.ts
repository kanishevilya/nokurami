import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";


@InputType()
export class ChangeEmailInput {


    @Field(() => String)
    @IsString()
    @IsUUID('4')
    @IsNotEmpty()
    public token: string;
}