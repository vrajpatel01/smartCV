import { Request } from "express";
import { IResult } from "ua-parser-js";

export type Req = {
    clientIp: string | string[];
    clientAgent: IResult
} & Request;