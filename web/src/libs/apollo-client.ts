import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
    headers: {
        "apollo-require-preflight": "true"
    }
});

const wsLink = new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
    }
});

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )
}, wsLink, httpLink)

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});