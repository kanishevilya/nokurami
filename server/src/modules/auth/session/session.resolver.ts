import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UserModel } from '../account/models/user.model';
import type { GraphqlContext } from '@/src/shared/types/graphql.context.types';
import { LoginInput } from './inputs/login.input';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { SessionModel } from './models/session.model';
import { UserRole } from '@/prisma/generated';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) { }

  @Authorization(UserRole.ADMIN)
  @Query(() => [SessionModel], { name: "getAllSessions" })
  public async getAllSessions() {
    return this.sessionService.getAllSessions()
  }

  @Authorization()
  @Query(() => [SessionModel], { name: "getSessionsByUser" })
  public async getSessionsByUser(@Context() { req }: GraphqlContext) {
    return this.sessionService.getSessionsByUser(req)
  }

  @Authorization()
  @Query(() => SessionModel, { name: "getCurrentSession" })
  public async getCurrentSession(@Context() { req }: GraphqlContext) {
    return this.sessionService.getCurrentSession(req)
  }

  @Mutation(() => UserModel, { name: "login" })
  public async login(@Context() { req }: GraphqlContext, @Args('data') input: LoginInput, @UserAgent() userAgent: string) {
    return this.sessionService.login(req, input, userAgent)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "logout" })
  public async logout(@Context() { req }: GraphqlContext) {
    return this.sessionService.logout(req)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "clearSessionFromCookie" })
  public async clearSession(@Context() { req }: GraphqlContext) {
    return this.sessionService.clearSessions(req)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "removeSession" })
  public async removeSession(@Context() { req }: GraphqlContext, @Args('id') id: string) {
    return this.sessionService.remove(req, id)
  }
}
