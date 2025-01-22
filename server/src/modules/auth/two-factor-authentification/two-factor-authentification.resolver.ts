import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TwoFactorAuthentificationService } from './two-factor-authentification.service';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { User } from '@/prisma/generated';

import { TotpModel } from './models/totp.model';
import { Enable2FAInput } from './inputs/enable.2fa.input';
import { Authorization } from '@/src/shared/decorators/auth.decorator';

@Resolver('TwoFactorAuthentification')
export class TwoFactorAuthentificationResolver {
  constructor(private readonly twoFactorAuthentificationService: TwoFactorAuthentificationService) { }

  @Authorization()
  @Query(() => TotpModel, { name: "generateTotpSecret" })
  public async generate(@Authorized() user: User) {
    return this.twoFactorAuthentificationService.generate(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "enable2FA" })
  public async enable(@Authorized() user: User, @Args('data') input: Enable2FAInput) {
    return this.twoFactorAuthentificationService.enable(user, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "disable2FA" })
  public async disable(@Authorized() user: User) {
    return this.twoFactorAuthentificationService.disable(user)
  }
}
