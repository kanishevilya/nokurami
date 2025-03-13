import { Module } from '@nestjs/common';
import { SocialService } from './services/social.service';
import { SocialResolver } from './resolvers/social.resolver';
import { PrismaModule } from '../database/prisma.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
    imports: [PrismaModule, PubSubModule],
    providers: [SocialService, SocialResolver],
    exports: [SocialService],
})
export class SocialModule { } 