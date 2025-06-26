import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

const validate = (schema: any): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // all errors
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.details });
            return;
        }
        next();
    }
}

export default validate;