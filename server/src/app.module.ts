import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SocialModule } from './social/social.module';

@Module({
    imports: [
        CoreModule,
        SocialModule,
    ],
})
export class AppModule { } 