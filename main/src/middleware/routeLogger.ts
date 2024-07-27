import { Request, Response, NextFunction } from "express";
import { Log } from "../services";

const routeLogger = (req: Request, res: Response, next: NextFunction) => {
    switch (req.method) {
        case 'GET':
            Log.successFirstArgColor(req.method, req.path)
            break;
        case 'POST':
            Log.warningFirstArgColor(req.method, req.path);
            break;
        case 'PUT':
            Log.infoFirstArgColor(req.method, req.path);
            break;
        case 'DELETE':
            Log.errorFirstArgColor(req.method, req.path);
            break;
        case 'PATCH':
            Log.infoFirstArgColor(req.method, req.path);
            break;
        default:
            break;
    }
    next();
}

export default routeLogger;