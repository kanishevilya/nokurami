import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class FiltersInput {

    @Field(() => Number, { nullable: true })
    @IsNumber()
    @IsOptional()
    take?: number

    @Field(() => Number, { nullable: true })
    @IsNumber()
    @IsOptional()
    skip?: number

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    searchKey?: string
}