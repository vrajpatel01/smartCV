import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "../services";
import { asyncErrorHandler } from "../utils";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    return CustomResponse.send(res, false, 404, 'Route not found');
})