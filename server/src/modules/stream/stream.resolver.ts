import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StreamService } from './stream.service';
import { StreamModel } from './models/stream.model';
import { FiltersInput } from './inputs/filters.input';
import { GenerateStreamTokenModel } from './models/generate-stream-token.model';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) { }

  @Query(() => [StreamModel], { name: "findAllStreams" })
  public async findAll(@Args('filters') input: FiltersInput) {
    return this.streamService.findAll(input)
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
