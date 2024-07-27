import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../../../utils";
import { CustomResponse } from "../../../services";
import { userValidator } from "../../../validator";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config";
import userModel from "../../../models/user.model";

type tokenBody = {
    email: string
}

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = userValidator.register.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { name, registerToken, password } = req.body;
    const decodedToken: tokenBody = jwt.verify(registerToken as string, JWT_SECRET as string) as tokenBody;

    const user = await userModel.create({
        name,
        email: decodedToken.email,
        password
    });

    if (user.error) return next(user.error);

    return CustomResponse.send(res, true, 200, "Account created successfully")
})