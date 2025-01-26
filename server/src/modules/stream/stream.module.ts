import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamResolver } from './stream.resolver';
import { IngressModule } from './ingress/ingress.module';

@Module({
  providers: [StreamResolver, StreamService],
  imports: [IngressModule],
})
export class StreamModule {}
