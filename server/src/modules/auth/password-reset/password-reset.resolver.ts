import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordResetService } from './password-reset.service';
import { GraphqlContext } from '@/src/shared/types/graphql.context.types';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import { NewPasswordInput } from './inputs/new-password.input';

@Resolver('PasswordReset')
export class PasswordResetResolver {
  constructor(private readonly passwordResetService: PasswordResetService) { }

  @Mutation(() => Boolean, { name: 'reset_password' })
  public async reset_password(
    @Context() { req }: GraphqlContext,
    @Args('data') input: ResetPasswordInput,
    @UserAgent() userAgent: string
  ) {
    return this.passwordResetService.reset_password(req, input, userAgent)
  }

  @Mutation(() => Boolean, { name: 'new_password' })
  public async new_password(
    @Args('data') input: NewPasswordInput
  ) {
    return this.passwordResetService.new_password(input)
  }
}
