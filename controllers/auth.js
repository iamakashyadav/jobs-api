const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bycrpt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getHashedPassword = async (password) => {
    const salt = await bycrpt.genSalt(10);
    return await bycrpt.hash(password, salt);
}

const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME });
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // *****so in schema we have use middelware which will hashed the password before saving to db *****
    // that's why i have comment the code
    // const hashedPassword = await getHashedPassword(password);
    // const user = await User.create({ name, email, password: hashedPassword });

    // create user
    const user = await User.create({ name, email, password });

    // create token
    const token = createJWT({ userId: user._id, name: user.name });

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

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

module.exports = {
    register,
    login
};