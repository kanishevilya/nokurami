import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './models/user.model';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { ChangeEmailInput } from './inputs/change-email.input';
import { User } from '@/prisma/generated';
import { ChangePasswordInput } from './inputs/change-password.input';
import { GraphqlContext } from '@/src/shared/types/graphql.context.types';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Authorization()
  @Query(() => UserModel, { name: 'getProfile' })
  public async getProfile(@Authorized('id') id: string) {
    return this.accountService.getUserById(id)
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  public async create(@Args({ name: 'data', type: () => CreateUserInput }) createUserInput: CreateUserInput) {
    return this.accountService.create(createUserInput)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'requestToEmailChange' })
  public async requestToEmailChange(@Context() { req }: GraphqlContext, @Authorized() user: User) {
    return this.accountService.requestToEmailChange(req, user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeEmail' })
  public async changeEmail(@Authorized() user: User, @Args({ name: 'data', type: () => ChangeEmailInput }) changeEmailInput: ChangeEmailInput) {
    return this.accountService.changeEmail(user, changeEmailInput)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changePassword' })
  public async changePassword(@Authorized() user: User, @Args({ name: 'data', type: () => ChangePasswordInput }) changePasswordInput: ChangePasswordInput) {
    return this.accountService.changePassword(user, changePasswordInput)
  }
}

