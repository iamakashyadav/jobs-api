const { StatusCodes } = require("http-status-codes");

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // all errors
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details });
        }
        next();
    }
}

module.exports = validate;