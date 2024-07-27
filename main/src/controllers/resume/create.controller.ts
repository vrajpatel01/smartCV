import { NextFunction, Response, Request } from "express";
import { asyncErrorHandler } from "../../utils";
import resumeValidator from "../../validator/resume";
import resumeModel from "../../models/resume.model";
import { CustomResponse } from "../../services";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = resumeValidator.create.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { title, user } = req.body;

    const userId = user._id.toString();

    const saveResume = await resumeModel.create({
        user: userId,
        title,
        slug: title
    })

    if (!saveResume) return next("Something went wrong please try again later");

    return CustomResponse.send(res, true, 200, 'Resume created successfully', saveResume);
})