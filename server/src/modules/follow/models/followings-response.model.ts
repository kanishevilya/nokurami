import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FollowModel } from './follow.model';

@ObjectType()
export class FollowingsResponse {
    @Field(() => [FollowModel])
    public followings: FollowModel[];

    @Field(() => Int)
    public totalCount: number;
}