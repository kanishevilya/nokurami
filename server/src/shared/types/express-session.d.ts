import "express-session"
import { SessionMetadata } from "./session-metadata.types"

declare module 'express-session' {
    interface SessionData {
        userId?: string,
        createdAt?: Date | string,
        metadata: SessionMetadata
    }
}