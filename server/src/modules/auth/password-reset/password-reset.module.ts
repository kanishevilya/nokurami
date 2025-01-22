import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetResolver } from './password-reset.resolver';

@Module({
  providers: [PasswordResetResolver, PasswordResetService],
})
export class PasswordResetModule {}
