import { isDev } from "@/src/shared/utils/is-dev.util";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export function getGraphQLConfig(configService: ConfigService): ApolloDriverConfig {
    return {
        playground: isDev(configService),
        path: configService.getOrThrow<string>("GRAPHQL_PREFIX"),
        autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
        sortSchema: true,
        installSubscriptionHandlers: true,
        context: ({ req, res }) => ({ req, res }),
    }
}