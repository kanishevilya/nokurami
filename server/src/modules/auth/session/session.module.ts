import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { VerificationService } from '../verification/verification.service';

@Module({
  providers: [SessionResolver, SessionService, VerificationService],
})
export class SessionModule { }
