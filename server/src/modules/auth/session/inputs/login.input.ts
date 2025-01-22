import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";


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

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    public pin?: string
}