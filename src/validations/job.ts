import Joi from 'joi';

export default Joi.object({
    company: Joi.string().min(3).max(50).required().messages({
        'string.min': 'company must be at least 6 characters',
        'string.max': 'company must be less than 50 characters'
    }),
    position: Joi.string().min(3).max(50).required().messages({
        'string.min': 'position must be at least 3 characters',
        'string.max': 'position must be less than 50 characters'
    }),
    status: Joi.string().min(6).valid('interview', 'pending', 'declined').messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    })
});
