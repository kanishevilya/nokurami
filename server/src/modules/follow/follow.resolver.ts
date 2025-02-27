import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { FindFollowersInput } from './inputs/find-followers.input';
import { FollowersResponse } from './models/followers-response.model';
import { FollowingsResponse } from './models/followings-response.model';

@Resolver('Follow')
export class FollowResolver {
  constructor(private readonly followService: FollowService) { }

  @Authorization()
  @Query(() => FollowersResponse, { name: 'findMyFollowers' })
  public async findMyFollowers(
    @Authorized('id') userId: string,
    @Args('data', { nullable: true }) input: FindFollowersInput = {}
  ) {
    return this.followService.findFollowersByUserId(userId, input);
  }

  @Authorization()
  @Query(() => FollowingsResponse, { name: 'findMyFollowings' })
  public async findMyFollowings(
    @Authorized('id') userId: string,
    @Args('data', { nullable: true }) input: FindFollowersInput = {}
  ) {
    return this.followService.findFollowingsByUserId(userId, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'followToChannel' })
  public async follow(
    @Authorized("id") userId: string,
    @Args('channelId') channelId: string
  ) {
    return this.followService.follow(userId, channelId)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'unfollowFromChannel' })
  public async unfollow(
    @Authorized("id") userId: string,
    @Args('channelId') channelId: string
  ) {
    return this.followService.unfollow(userId, channelId)
  }
}
