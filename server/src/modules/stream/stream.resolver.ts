import { Query, Resolver } from '@nestjs/graphql';
import { StreamService } from './stream.service';
import { StreamModel } from './models/stream.model';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) { }

  @Query(() => [StreamModel], { name: "findAllStreams" })
  public async findAll() {
    return this.streamService.findAll()
  }
}
