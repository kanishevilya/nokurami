import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
    headers: {
        "apollo-require-preflight": "true"
    }
});

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(
    createClient({
        url: process.env.NEXT_PUBLIC_SERVER_URL?.replace('http', 'ws') || 'ws://localhost:3001/graphql',
        connectionParams: {
            credentials: 'include'
        }
    })
) : null;

const splitLink = typeof window !== 'undefined' && wsLink !== null
    ? split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    )
    : httpLink;

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});