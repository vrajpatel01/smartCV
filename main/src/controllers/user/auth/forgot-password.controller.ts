import { NextFunction, Response, Request } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { commonValidator } from "../../../validator";
import generateOTP from "../../../utils/generateOTP";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import { FRONTEND_URL, JWT_SECRET, SAULT_ROUND } from "../../../config";
import { Queue } from "bullmq";
import { connection } from "../../../config/redis.config";
import EmailData from "../../../types/emailData";
import forgotPasswordTemplate from "../../../utils/forgotPasswordTemplate";
import userModel from "../../../models/user.model";

const queue = new Queue('email', {
    connection
});

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = commonValidator.forgotPasswordValidator.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { email } = req.body;

    const findUser = await userModel.findOne({ email });
    if (!findUser) return CustomResponse.send(res, false, 400, 'This email is not registered');

    const otp = generateOTP();
    const otpHash = bcrypt.hashSync(otp.toString(), parseInt(SAULT_ROUND as string));

    const insertTOken = await userModel.updateOne({ email }, { resetPasswordToken: otpHash })
    if (insertTOken.modifiedCount === 0) return CustomResponse.send(res, false, 400, 'Something went wrong please try again later');

    const forgotPasswordToken = jwt.sign({ email, secrete: otp }, JWT_SECRET as string, { expiresIn: '10m' });
    const emailQPayload: EmailData = {
        html: forgotPasswordTemplate(`${FRONTEND_URL}/auth/reset-password?token=${forgotPasswordToken}`),
        subject: "SmartCV - Forgot Password",
        to: email
    }

    queue.add(`${email}-forgot-pass-${new Date()}`, emailQPayload, {
        attempts: 2,
        removeOnComplete: true,
    })
    return CustomResponse.send(res, true, 200, 'Password reset link has been sent to your email');
})