import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { commonValidator } from "../../../validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { JWT_SECRET } from "../../../config";

type tokenBody = {
    token: string,
    email: string
}

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = commonValidator.verifyOtpValidator.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { otp, otpToken } = req.body;

    const decodedToken: tokenBody = jwt.verify(otpToken, JWT_SECRET as string) as tokenBody
    const verifyOTP = bcrypt.compareSync(otp.toString(), decodedToken.token)

    if (!verifyOTP) return CustomResponse.send(res, false, 400, 'Invalid OTP');

    const registerToken = jwt.sign({ email: decodedToken.email }, JWT_SECRET as string, { expiresIn: '5m' })

    return CustomResponse.send(res, true, 200, 'OTP verify successfully', {
        registerToken
    })
})