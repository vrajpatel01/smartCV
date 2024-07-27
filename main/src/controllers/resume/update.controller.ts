import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "../../services";
import { asyncErrorHandler } from "../../utils";
import resumeValidator from '../../validator/resume'
import resumeModel from "../../models/resume.model";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = resumeValidator.update.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { visibility, title, resumeId } = req.body;

    const updateResume = await resumeModel.findOneAndUpdate({ _id: resumeId }, {
        ...(visibility && { visibility }),
        ...(title && { title }),
        ...(title && { slug: title.toLowerCase().split(' ').join('-') })
    });

    if (!updateResume) return CustomResponse.send(res, false, 400, 'Something went wrong please try again later');

    return CustomResponse.send(res, true, 200, 'your resume updated successfully');
})