import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamResolver } from './stream.resolver';

@Module({
  providers: [StreamResolver, StreamService],
})
export class StreamModule {}
