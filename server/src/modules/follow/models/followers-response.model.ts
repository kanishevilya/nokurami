import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FollowModel } from './follow.model';

@ObjectType()
export class FollowersResponse {
    @Field(() => [FollowModel])
    public followers: FollowModel[];

    @Field(() => Int)
    public totalCount: number;
}