import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";
import { UnauthenticatedError } from "../errors";
import User from "../models/User";

const createJWT = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME });
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

    // compare password
    const isPasswordMatch = user ? await bycrpt.compare(password, user.password) : false;
    if (!isPasswordMatch) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // create JWT token
    const token = createJWT({ userId: user._id, name: user.name });

    res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
}

export {
    register,
    login,
}