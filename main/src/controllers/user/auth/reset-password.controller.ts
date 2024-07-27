import { NextFunction, Response, Request } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { commonValidator } from "../../../validator";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, SAULT_ROUND } from "../../../config";
import bcrypt from "bcryptjs";
import userModel from "../../../models/user.model";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = commonValidator.resetPasswordValidator.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { password, token } = req.body;
    const { email, secrete } = jwt.verify(token, JWT_SECRET as string) as { email: string, secrete: number };
    const findUserData = await userModel.findOne({ email })
    if (!findUserData) return CustomResponse.send(res, false, 400, 'Request time out please try again');
    const isMatch = bcrypt.compareSync(secrete.toString(), findUserData.resetPasswordToken || '');

    if (!isMatch) return CustomResponse.send(res, false, 400, 'Request time out please try again');

    const hashPassword = bcrypt.hashSync(password, parseInt(SAULT_ROUND as string));

    const updatePassword = await userModel.updateOne({ email }, {
        password: hashPassword,
        resetPasswordToken: null
    });

    if (updatePassword.modifiedCount === 0) return CustomResponse.send(res, false, 400, 'Something went wrong please try again later');

    return CustomResponse.send(res, true, 200, 'password update successfully');
})