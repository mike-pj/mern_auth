import Joi from 'joi'

export const signupValidation = (data) => {
    const Schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return Schema.validate(data);
}

export const signinValidation = (data) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return Schema.validate(data)
}