import { Resolver } from '@nestjs/graphql';
import { IngressService } from './ingress.service';

@Resolver('Ingress')
export class IngressResolver {
  constructor(private readonly ingressService: IngressService) {}
}
