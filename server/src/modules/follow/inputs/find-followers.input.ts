import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { FollowOrderByInput } from './follow-order-by.input';

@InputType()
export class FindFollowersInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public search?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public skip?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public take?: number;

    @Field(() => FollowOrderByInput, { nullable: true })
    @IsOptional()
    public orderBy?: FollowOrderByInput;
}