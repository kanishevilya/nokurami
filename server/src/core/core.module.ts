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
import { MailModule } from '../modules/lib/mail/mail.module';
import { VerificationModule } from '../modules/auth/verification/verification.module';
import { PasswordResetModule } from '../modules/auth/password-reset/password-reset.module';
import { TwoFactorAuthentificationModule } from '../modules/auth/two-factor-authentification/two-factor-authentification.module';
import { ProfileModule } from '../modules/auth/profile/profile.module';
import { StreamModule } from '../modules/stream/stream.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvFile: !IS_DEV_ENV,
    }), GraphQLModule.forRootAsync({
        driver: ApolloDriver,
        imports: [ConfigModule],
        useFactory: getGraphQLConfig,
        inject: [ConfigService]
    }),
        PrismaModule,
        RedisModule,
        MailModule,
        AccountModule,
        SessionModule,
        ProfileModule,
        StreamModule,
        VerificationModule,
        PasswordResetModule,
        TwoFactorAuthentificationModule
    ]
})
export class CoreModule { }
