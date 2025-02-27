import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

enum SortOrder {
    asc = 'asc',
    desc = 'desc',
}

registerEnumType(SortOrder, {
    name: 'SortOrder',
    description: 'Order direction (ascending or descending)',
});

@InputType()
export class FollowOrderByInput {
    @Field(() => SortOrder, { nullable: true })
    @IsEnum(SortOrder)
    @IsOptional()
    public username?: SortOrder;

    @Field(() => SortOrder, { nullable: true })
    @IsEnum(SortOrder)
    @IsOptional()
    public createdAt?: SortOrder;
}