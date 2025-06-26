import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";
import { CustomAPIError, UnauthenticatedError } from "../errors";
import User from "../models/User";

const createJWT = (payload: any) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
        throw new CustomAPIError('JWT_SECRET_KEY is not defined');
    }
    let options: any = { expiresIn: process.env.JWT_LIFETIME };
    return jwt.sign(payload, JWT_SECRET_KEY, options);
}

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // create user
    const user = await User.create({ name, email, password });

    // create token
    const token = createJWT({ userId: user._id, name: user.name });

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Not a valid email');
    } else {
        const isPasswordMatch = await bycrpt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthenticatedError('Invalid Credentials');
        }
        // create JWT token
        const token = createJWT({ userId: user._id, name: user.name });

        res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
    }

}

export {
    register,
    login,
}