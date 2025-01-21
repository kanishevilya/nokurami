import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './modules/user.model';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => [UserModel], { name: 'findAllUsers' })
  public async findAll() {
    return this.accountService.findAll()
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  public async create(@Args({ name: 'data', type: () => CreateUserInput }) createUserInput: CreateUserInput) {
    return this.accountService.create(createUserInput)
  }
}

