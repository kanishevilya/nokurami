import { PrismaModule } from '@/src/core/prisma/prisma.module';
import { SocialService } from './services/social.service';
import { Module } from '@nestjs/common';
import { SocialResolver } from './resolvers/social.resolver';
import { PubSubProvider } from '../libs/pub-sub/pub-sub.provider';


@Module({
    imports: [PrismaModule],
    providers: [SocialService, SocialResolver, PubSubProvider],
    exports: [SocialService],
})
export class SocialModule { } 