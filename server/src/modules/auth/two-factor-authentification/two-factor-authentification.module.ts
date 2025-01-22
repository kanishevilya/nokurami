import { Module } from '@nestjs/common';
import { TwoFactorAuthentificationService } from './two-factor-authentification.service';
import { TwoFactorAuthentificationResolver } from './two-factor-authentification.resolver';

@Module({
  providers: [TwoFactorAuthentificationResolver, TwoFactorAuthentificationService],
})
export class TwoFactorAuthentificationModule {}
