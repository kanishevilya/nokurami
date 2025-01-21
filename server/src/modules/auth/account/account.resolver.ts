import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './modules/user.model';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { Authorization } from '@/src/shared/decorators/auth.decorator';

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
}

