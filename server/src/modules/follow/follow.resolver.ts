import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { FollowModel } from './models/follow.model';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';

@Resolver('Follow')
export class FollowResolver {
  constructor(private readonly followService: FollowService) { }

  @Authorization()
  @Query(() => [FollowModel], { name: 'findMyFollowers' })
  public async findMyFollowers(@Authorized("id") userId: string) {
    return this.followService.findFollowersByUserId(userId)
  }

  @Authorization()
  @Query(() => [FollowModel], { name: 'findMyFollowings' })
  public async findMyFollowings(@Authorized("id") userId: string) {
    return this.followService.findFollowingsByUserId(userId)
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
