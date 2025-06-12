import Joi from 'joi';

export const validateResidentData = (data: any, isUpdate = false) => {
    const schema = Joi.object({
        full_name: Joi.string().min(2).max(100).required(),
        phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
        email: Joi.string().email().required(),
    });

    if (isUpdate) {
        return schema.fork(['full_name', 'phone', 'email'], f => f.optional()).validate(data);
    }

    return schema.validate(data);
};