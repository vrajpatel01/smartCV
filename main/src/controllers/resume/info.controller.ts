import { NextFunction, Response, Request } from "express";
import { CustomResponse } from "../../services";
import { asyncErrorHandler } from "../../utils";
import resumeValidator from "../../validator/resume";
import resumeModel from "../../models/resume.model";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validator = resumeValidator.info.safeParse(req.body);
    if (validator.error) return next(validator.error);

    const { resumeId } = req.body;
    const updateResume = await resumeModel.findOneAndUpdate({ _id: resumeId },
        { data: req.body.data },
        { upsert: true, });
    if (!updateResume) return CustomResponse.send(res, false, 400, 'Something went wrong please try again later');

    return CustomResponse.send(res, true, 200, 'Data updated successfully');
})