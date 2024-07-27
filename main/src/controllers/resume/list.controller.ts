import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../../utils";
import resumeModel from "../../models/resume.model";
import { CustomResponse } from "../../services";

export default asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.body;
    const getResume = await resumeModel.find({ user: user._id }).select(['-user', '-__v', '-createdAt', '-updatedAt', '-data']);
    if (!getResume) return next('Something went wrong please try again later');
    return CustomResponse.send(res, true, 200, 'Your resumes', getResume);
})