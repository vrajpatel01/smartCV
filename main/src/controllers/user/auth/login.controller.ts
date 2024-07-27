import { NextFunction, Response } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { commonValidator } from "../../../validator";
import { Req } from "../../../types/response";
import userModel from "../../../models/user.model";

export default asyncErrorHandler(async (req: Req, res: Response, next: NextFunction) => {
    const validator = commonValidator.loginValidator.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { email, password } = req.body;
    const { clientIp } = req

    const user = await userModel.findOne({ email });

    if (user === null) return CustomResponse.send(res, false, 400, "Invalid email or password");
    if (!(await user.comparePassword(password))) return CustomResponse.send(res, false, 400, "Invalid email or password");

    const accessToken = user.accessToken();
    const refreshToken = user.refToken();

    const updateInfo = await userModel.updateOne({ email }, {
        refreshToken: refreshToken,
        ipAddress: clientIp
    });

    if (updateInfo.modifiedCount === 0) return CustomResponse.send(res, false, 400, "Something went wrong please try again later");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
    });

    return CustomResponse.send(res, true, 200, "Login successfully", {
        email: user.email,
        accessToken,
        refreshToken
    })
})