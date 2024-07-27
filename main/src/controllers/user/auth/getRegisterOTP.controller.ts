import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { commonValidator } from "../../../validator";
import bcrypt from "bcryptjs";
import generateOTP from "../../../utils/generateOTP";
import { JWT_SECRET, SAULT_ROUND } from "../../../config";
import jwt from 'jsonwebtoken';
import { Queue } from "bullmq";
import { connection } from "../../../config/redis.config";
import emailData from "../../../types/emailData";
import { registerOtpTemplate } from "../../../utils"
import userModel from "../../../models/user.model";
import adminModel from "../../../models/admin.model";

const queue = new Queue('email', {
    connection
})

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = commonValidator.getRegisterOTPValidator.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { email } = req.body;

    // const user = await adminModel.findOne({ email });
    // if (user) return CustomResponse.send(res, false, 400, "Email is in use");

    const otp = generateOTP();
    const otpHash = bcrypt.hashSync(otp.toString(), parseInt(SAULT_ROUND as string))
    const otpToken = jwt.sign({ token: otpHash, email: email }, JWT_SECRET as string, { expiresIn: '5m' })

    const emailQPayload: emailData = {
        html: registerOtpTemplate(otp, email),
        subject: "OTP for registration",
        to: email
    }

    await queue.add(`${email}-gro-${new Date().getTime()}`, emailQPayload, {
        attempts: 2,
        removeOnComplete: true,
    })

    return CustomResponse.send(res, true, 200, "OTP send to your email address", {
        sendTo: email,
        otpToken
    })
})