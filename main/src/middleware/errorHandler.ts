import { NextFunction, Request, Response } from "express";
import { DEBUG_MODE } from '../config'
import { CustomError, CustomResponse, Log } from "../services";
import { ZodError, ZodIssue } from "zod";
import { errorData } from "../types";
import { MongooseError, Error as MongoError } from "mongoose";
import mongoErrors from "../utils/mongoErrors";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let status: number = 500;
    let message: string = 'Having some problem!';
    let data: errorData = {
        ...(DEBUG_MODE === 'true' && { error: error.message }),
        ...(DEBUG_MODE === 'true' && { trackStack: error.stack }),
    }


    if (error.name === 'MongoServerError' && DEBUG_MODE?.toLocaleLowerCase() === 'true') {
        status = 400;
        const mongoError = mongoErrors(error);
        data = {
            ...mongoError
        }
    }

    if (error instanceof JsonWebTokenError) {
        status = 401;
        message = 'Unauthorized access please login again';
    }

    if (error instanceof CustomError) {
        status = error.statusCode;
        data = {
            error: error.message,
        }
    }

    if (error instanceof ZodError) {
        status = 400;
        data = {
            error: 'Invalid data',
            errors: error.errors.map((err: ZodIssue) => {
                const { path, expected, message, code, received } = err as any;
                return {
                    message,
                    ...(DEBUG_MODE?.toLocaleLowerCase() === 'true' && { expected }),
                    ...(DEBUG_MODE?.toLocaleLowerCase() === 'true' && { path: path.join('.') }),
                    ...(DEBUG_MODE?.toLocaleLowerCase() === 'true' && { code }),
                    ...(DEBUG_MODE?.toLocaleLowerCase() === 'true' && { received }),
                }
            })
        }
    }
    Log.error(error.message);
    return CustomResponse.send(res, false, status, message, data);
}

export default errorHandler;