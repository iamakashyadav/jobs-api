import { NextFunction, Request, Response } from "express";
import { CustomAPIError, UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../models/User";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
        throw new CustomAPIError('JWT_SECRET_KEY is not defined');
    }

    try {
        const payload: any = jwt.verify(token, JWT_SECRET_KEY);

        const user = User.findById(payload.id).select('-password');
        (req as any).user = { userId: payload.userId, name: payload.name };

        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export default auth;