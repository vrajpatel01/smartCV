import { NextFunction, Response, Request } from "express";
import { asyncErrorHandler } from "../../utils";
import { CustomResponse } from "../../services";
import resumeModel from "../../models/resume.model";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeId } = req.params;

    const updateResume = await resumeModel.findOne({ _id: resumeId }).select(['-user', '-__v', '-createdAt', '-updatedAt']);
    if (!updateResume) return CustomResponse.send(res, false, 400, 'Something went wrong please try again later');
    return CustomResponse.send(res, true, 200, 'your resume', updateResume);
})