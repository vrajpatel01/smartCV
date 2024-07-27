import { Response } from 'express';

class CustomResponse {
    constructor(
        public res: Response,
        public success: boolean,
        public statusCode: number,
        public message: string,
        public data?: object
    ) { }

    public send(): void {
        this.res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            ...(this.data && { data: this.data })
        })
    }

    static send(res: Response, success: boolean, statusCode: number, message: string, data?: object) {
        res.status(statusCode).json({
            success,
            message,
            data
        })
    }
}

export default CustomResponse;