import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UserModel } from '../account/modules/user.model';
import { GraphqlContext } from '@/src/shared/types/graphql.context.types';
import { LoginInput } from './inputs/login.input';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) { }

  @Mutation(() => UserModel, { name: "login" })
  public async login(@Context() { req }: GraphqlContext, @Args('data') input: LoginInput) {
    return this.sessionService.login(req, input)
  }

  @Mutation(() => Boolean, { name: "logout" })
  public async logout(@Context() { req }: GraphqlContext) {
    return this.sessionService.logout(req)
  }
}
