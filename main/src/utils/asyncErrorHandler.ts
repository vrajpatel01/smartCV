import { NextFunction, Request, Response } from "express"

const asyncErrorHandler = (cb: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await cb(req, res, next)
    } catch (error) {
        next(error)
    }
}

export default asyncErrorHandler;