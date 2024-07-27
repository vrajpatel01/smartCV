import { NextFunction, Response, Request } from "express";
import { asyncErrorHandler } from "../utils";
import { CustomResponse } from "../services";

export default asyncErrorHandler((req: Request, res: Response, next: NextFunction) => {
    return CustomResponse.send(res, true, 200, 'Welcome to the SmartCV API')
})