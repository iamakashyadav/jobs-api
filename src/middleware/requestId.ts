import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

const X_REQUEST_ID_KEY = 'X-Request-ID';

const requestId = (req: Request, res: Response, next: NextFunction) => {
    let requestId = req.headers[X_REQUEST_ID_KEY];
    if (!requestId) {
        requestId = uuidv4();
        req.headers[X_REQUEST_ID_KEY] = requestId;
    }
    res.set(X_REQUEST_ID_KEY, requestId);
    next();
}

export default requestId;