import { Request, Response } from "express"

export interface GraphqlContext {
    req: Request
    res: Response
}