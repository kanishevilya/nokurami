declare module '*.graphql' {
    import type { DocumentNode } from "graphql";
    const schema: DocumentNode

    export = schema
}