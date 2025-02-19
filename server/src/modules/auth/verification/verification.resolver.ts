import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { VerificationService } from './verification.service';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import type { GraphqlContext } from '@/src/shared/types/graphql.context.types'
import { VerificationInput } from './inputs/verification.input';
import { AuthModel } from '../session/models/auth.model';

@Resolver('Verification')
export class VerificationResolver {
  public constructor(
    private readonly verificationService: VerificationService
  ) { }

  @Mutation(() => AuthModel, { name: 'verifyAccount' })
  public async verify(
    @Context() { req }: GraphqlContext,
    @Args('data') input: VerificationInput,
    @UserAgent() userAgent: string
  ) {
    return this.verificationService.verify(req, input, userAgent)
  }
}
