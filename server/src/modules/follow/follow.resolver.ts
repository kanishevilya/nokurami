import { Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';

@Resolver('Follow')
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}
}
