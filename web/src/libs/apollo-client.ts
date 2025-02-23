import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
    headers: {
        "apollo-require-preflight": "true"
    }
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})