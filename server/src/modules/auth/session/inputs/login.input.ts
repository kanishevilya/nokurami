import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";


@InputType()
export class LoginInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
    public login: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    public password: string
}