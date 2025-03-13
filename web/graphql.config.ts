import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
    schema: ['http://127.0.0.1:4000/graphql'],
    documents: ['./src/graphql/**/*.graphql'],
    extensions: {
        codegen: {
            generates: {
                './src/graphql/generated/output.ts': {
                    plugins: [
                        'typescript',
                        'typescript-operations',
                        'typescript-react-apollo',
                    ],
                    config: {
                        skipTypename: false,
                        withHooks: true,
                        withHOC: false,
                        withComponent: false,
                    },
                },
            },
        },
    },
};

export default config;
