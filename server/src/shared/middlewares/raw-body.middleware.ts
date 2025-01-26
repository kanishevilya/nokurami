import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as getRawBody from "raw-body"

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction) {
        if (!req.readable) {
            return next(new BadRequestException("Невалидные данные из запроса"))
        }

        getRawBody(req, { encoding: 'utf-8' }).then(rawBody => {
            req.body = rawBody;
            next()
        }).catch(err => {
            throw new BadRequestException("Ошибка при получении ", err)

            next(err)
        })
    }
}