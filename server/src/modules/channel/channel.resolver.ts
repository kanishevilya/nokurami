import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { UserModel } from '../auth/account/models/user.model';

@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) { }

  @Query(() => [UserModel], { name: 'findRecommendedChannels' })
  public async findRecommended() {
    return this.channelService.findRecommended()
  }


  @Query(() => UserModel, { name: 'findChannelByUsername' })
  public async findByUsername(@Args('username') username: string) {
    return this.channelService.findByUsername(username)
  }

  @Query(() => Number, { name: 'findFollowersCountByChannel' })
  public async findFollowersCountByChannel(
    @Args('channelId') channelId: string
  ) {
    return this.channelService.findFollowersCountByChannel(channelId)
  }

  @Query(() => Number, { name: 'findFollowingsCountByChannel' })
  public async findFollowingsCountByChannel(
    @Args('channelId') channelId: string
  ) {
    return this.channelService.findFollowingsCountByChannel(channelId)
  }
}
