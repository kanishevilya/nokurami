/* eslint-disable @typescript-eslint/no-require-imports */
import { Request } from "express";
import { SessionMetadata } from "../types/session-metadata.types";
import { IS_DEV_ENV } from "./is-dev.util";
import { lookup } from "geoip-lite";

import * as countries from "i18n-iso-countries"

import DeviceDetector = require("device-detector-js")

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export function getSessionMetadata(req: Request, userAgent: string): SessionMetadata {
    const ip = IS_DEV_ENV
        ? '185.100.67.211'
        : Array.isArray(req.headers['cf-connecting-ip'])
            ? req.headers['cf-connecting-ip'][0]
            : req.headers['cf-connecting-ip']
            || (typeof req.headers['x-forwarded-for'] === 'string'
                ? req.headers['x-forwarded-for'].split(',')[0]
                : req.ip);


    const location = lookup(ip)
    const device = new DeviceDetector().parse(userAgent)

    return {
        location: {
            country: countries.getName(location.country, 'en') || 'Неизвестно',
            city: location.city,
            latitude: location.ll[0] || 0,
            longitude: location.ll[1] || 0
        },
        device: {
            browser: device.client.name,
            os: device.os.name,
            type: device.device.type
        },
        ip: ip
    }
}