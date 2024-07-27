import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils";
import { CustomResponse } from "../services";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";
import userModel from "../models/user.model";


export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '')

    if (!accessToken) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
        message: 'Invalid token, Please login again.'
    });

    jwt.verify(accessToken, JWT_SECRET as string, async (accessTokenError: any, accessTokenValue: any) => {
        try {
            if (accessTokenError) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
                message: 'Invalid token, Please login again.'
            });
            const userInformation = await userModel.findOne({ _id: accessTokenValue.id })
            if (!userInformation) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
                message: 'Invalid token, Please login again.'
            });
            req.body.user = userInformation
            return next();
        } catch (error) {
            return next(error)
        }
    })



    // if (!accessToken) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
    //     message: 'Invalid token, Please login again.'
    // });

    // jwt.verify(accessToken, JWT_SECRET as string, async (accessTokenError: any, accessTokenValue: any) => {
    //     if (!accessTokenError) {
    //         try {
    //             const userInformation = await userModel.findOne({ _id: accessTokenValue.id })
    //             if (!userInformation) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
    //                 message: 'Invalid token, Please login again.'
    //             });
    //             req.body.user = userInformation
    //             return next();
    //         } catch (error) {
    //             return next(error)
    //         }
    //     }

    //     const refreshToken = req.cookies?.refreshToken || req.body.refreshToken?.replace('Bearer ', '')
    //     jwt.verify(refreshToken, JWT_SECRET as string, async (refreshTokenError: any, refreshTokenValue: any) => {
    //         console.log('refreshTokenError', refreshTokenError);
    //         console.log('refreshTokenValue', refreshTokenValue);


    //         if (refreshTokenError) return CustomResponse.send(res, false, 401, 'Unauthorized access', {
    //             message: 'Invalid token, Please login again.'
    //         });
    //         try {

    //             const storedRefreshToken = await userModel.findOne({ _id: refreshTokenValue.id, refreshToken: refreshToken })
    //             console.log('refreshToken', storedRefreshToken);

    //             if (!storedRefreshToken || storedRefreshToken.refreshToken !== refreshToken) return CustomResponse.send(res, false, 404, 'account not found', {
    //                 message: 'account not found, Please login again.'
    //             });

    //             const userInformation: any = await userModel.findOne({ _id: refreshTokenValue.id })
    //             if (!userInformation) return CustomResponse.send(res, false, 404, 'Faculty not found', {
    //                 message: 'Faculty not found, Please login again.'
    //             });


    //             const newAccessToken = jwt.sign({
    //                 id: userInformation.id,
    //             }, JWT_SECRET as string, {
    //                 expiresIn: '12h'
    //             })

    //             res.cookie('accessToken', newAccessToken, {
    //                 httpOnly: true,
    //                 secure: true
    //             });
    //             req.body.user = userInformation
    //             return next();
    //         } catch (error) {
    //             return next(error)
    //         }
    //     })
    // })

})