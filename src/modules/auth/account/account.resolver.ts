import { Resolver, Query } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './modules/user.model';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => [UserModel], { name: 'findAllUsers' })
  public async findAll() {
    return this.accountService.findAll()
  }
}

