import { NextFunction, Response } from "express";
import { asyncErrorHandler } from "../utils";
import parser from 'ua-parser-js';
import { Req } from "../types/response";

export default asyncErrorHandler(async (req: Req, res: Response, next: NextFunction) => {
    // const client = req.headers['user-agent'] || '';
    // const info = parser(client);

    const ipAddress =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-header-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    // console.log(info);

    req.clientIp = ipAddress;
    // req.clientAgent = info;

    next();
})