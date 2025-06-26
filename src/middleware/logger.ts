import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {

    console.log(`${req.headers['X-Request-ID']} ${req.method} ${req.path} ${req.body ? JSON.stringify(req.body) : ''}`);
    next();
}

export default logger;