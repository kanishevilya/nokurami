import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class VerificationInput {
    @Field(() => String)
    @IsUUID('4')
    @IsNotEmpty()
    public token: string
}
