import { Module } from '@nestjs/common';
import { IngressService } from './ingress.service';
import { IngressResolver } from './ingress.resolver';

@Module({
  providers: [IngressResolver, IngressService],
})
export class IngressModule {}
