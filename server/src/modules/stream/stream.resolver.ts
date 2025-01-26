import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StreamService } from './stream.service';
import { StreamModel } from './models/stream.model';
import { FiltersInput } from './inputs/filters.input';
import { GenerateStreamTokenModel } from './models/generate-stream-token.model';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { User } from '@/prisma/generated';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import * as Upload from 'graphql-upload/Upload.js'
import { FileValidationPipe } from '@/src/shared/pipes/file-validation.pipe';
import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) { }

  @Query(() => [StreamModel], { name: "findAllStreams" })
  public async findAll(@Args('filters') input: FiltersInput) {
    return this.streamService.findAll(input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamPreview' })
  public async changePreview(
    @Authorized() user: User,
    @Args('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)
    thumbnail: Upload
  ) {
    return this.streamService.changePreview(user, thumbnail)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeStreamPreview' })
  public async removePreview(@Authorized() user: User) {
    return this.streamService.removePreview(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamInfo' })
  public async changeInfo(
    @Authorized() user: User,
    @Args('data') input: ChangeStreamInfoInput
  ) {
    return this.streamService.changeInfo(user, input)
  }


  @Query(() => [StreamModel], { name: "findRandomStreams" })
  public async findRandomStreams() {
    return this.streamService.findRandom()
  }

  @Mutation(() => GenerateStreamTokenModel, { name: 'generateStreamToken' })
  public async generateStreamToken(@Args("data") input: GenerateStreamTokenInput) {
    return this.streamService.generateStreamToken(input)
  }

}
