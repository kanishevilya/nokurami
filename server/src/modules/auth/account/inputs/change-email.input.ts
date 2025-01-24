import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";


@InputType()
export class ChangeEmailInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @Field(() => String)
    @IsString()
    @IsUUID('4')
    @IsNotEmpty()
    public token: string;
}