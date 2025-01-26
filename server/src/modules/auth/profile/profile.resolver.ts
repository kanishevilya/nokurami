import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import * as Upload from 'graphql-upload/Upload.js'


import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { User } from '@/prisma/generated';
import { SocialLinkInput, SocialLinkOrderInput } from './inputs/social-link.input';
import { SocialLinkModel } from './models/social-link.model';
import { FileValidationPipe } from '@/src/shared/pipes/file-validation.pipe';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeProfileAvatar' })
  public async changeAvatar(
    @Authorized() user: User,
    @Args('avatar', { type: () => GraphQLUpload }, FileValidationPipe)
    avatar: Upload
  ) {
    return this.profileService.changeAvatar(user, avatar)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeProfileAvatar' })
  public async removeAvatar(@Authorized() user: User) {
    return this.profileService.removeAvatar(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "changeProfileInfo" })
  public async changeInfo(@Authorized() user: User, @Args('data') input: ChangeProfileInfoInput) {
    return this.profileService.changeInfo(user, input)
  }

  @Authorization()
  @Query(() => [SocialLinkModel], { name: 'findSocialLinks' })
  public async findSocialLinks(@Authorized() user: User) {
    return this.profileService.findSocialLinks(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'createSocialLink' })
  public async createSocialLink(
    @Authorized() user: User,
    @Args('data') input: SocialLinkInput
  ) {
    return this.profileService.createSocialLink(user, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'reorderSocialLinks' })
  public async reorderSocialLinks(
    @Args('list', { type: () => [SocialLinkOrderInput] })
    list: SocialLinkOrderInput[]
  ) {
    return this.profileService.reorderSocialLinks(list)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateSocialLink' })
  public async updateSocialLink(
    @Args('id') id: string,
    @Args('data') input: SocialLinkInput
  ) {
    return this.profileService.updateSocialLink(id, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSocialLink' })
  public async removeSocialLink(@Args('id') id: string) {
    return this.profileService.removeSocialLink(id)
  }
}
