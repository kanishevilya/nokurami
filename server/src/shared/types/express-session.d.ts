import "express-session"
import { SessionMetadata } from "./session-metada.types"

declare module 'express-session' {
    interface SessionData {
        userId?: string,
        createdAt?: Date | string,
        metadata: SessionMetadata
    }
}