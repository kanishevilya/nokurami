import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from '../shared/utils/is-dev.util';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphQLConfig } from './config/graphql.config';
import { RedisModule } from './redis/redis.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { SessionModule } from '../modules/auth/session/session.module';
import { MailModule } from '../modules/libs/mail/mail.module';
import { VerificationModule } from '../modules/auth/verification/verification.module';
import { PasswordResetModule } from '../modules/auth/password-reset/password-reset.module';
import { TwoFactorAuthentificationModule } from '../modules/auth/two-factor-authentification/two-factor-authentification.module';
import { ProfileModule } from '../modules/auth/profile/profile.module';
import { StreamModule } from '../modules/stream/stream.module';
import { LivekitModule } from '../modules/libs/livekit/livekit.module';
import { IngressModule } from '../modules/stream/ingress/ingress.module';
import { getLiveKitConfig } from './config/livekit.config';
import { WebhookModule } from '../modules/webhook/webhook.module';
import { CategoryModule } from '../modules/category/category.module';
import { MinioStorageModule } from '../modules/libs/minio-storage/minio-storage.module';
import { ChatModule } from '../modules/chat/chat.module';
import { FollowModule } from '../modules/follow/follow.module';
import { ChannelModule } from '../modules/channel/channel.module';
import { NotificationModule } from '../modules/notification/notification.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvFile: !IS_DEV_ENV,
    }), GraphQLModule.forRootAsync({
        driver: ApolloDriver,
        imports: [ConfigModule],
        useFactory: getGraphQLConfig,
        inject: [ConfigService]
    }), LivekitModule.registerAsync({
        imports: [ConfigModule],
        useFactory: getLiveKitConfig,
        inject: [ConfigService]
    }),
        PrismaModule,
        RedisModule,
        MailModule,
        LivekitModule,
        AccountModule,
        SessionModule,
        ProfileModule,
        CategoryModule,
        StreamModule,
        ChatModule,
        NotificationModule,
        FollowModule,
        ChannelModule,
        IngressModule,
        MinioStorageModule,
        VerificationModule,
        PasswordResetModule,
        TwoFactorAuthentificationModule,
        WebhookModule
    ]
})
export class CoreModule { }
