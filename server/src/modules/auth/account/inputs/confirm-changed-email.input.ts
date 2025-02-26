import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";


@InputType()
export class ConfirmChangedEmailInput {
    @Field(() => String)
    @IsString()
    @IsUUID('4')
    @IsNotEmpty()
    public token: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public newEmail: string
}