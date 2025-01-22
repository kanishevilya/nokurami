import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationResolver } from './verification.resolver';

@Module({
  providers: [VerificationResolver, VerificationService],
})
export class VerificationModule { }
