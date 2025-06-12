import Joi from 'joi';

export const validateHostelData = (data: any, isUpdate = false) => {
    const schema = Joi.object({
        name: Joi.string().max(100).required(),
        house_num: Joi.number().required(),
        building: Joi.number().required(),
        organization_id: Joi.number().required(),
        address: Joi.object({
            city_district: Joi.string().max(50).required(),
            street: Joi.string().max(100).required(),
            zip_code: Joi.string().max(20).required()
        }).optional()
    });

    if (isUpdate) {
        return schema.fork(['name', 'house_num', 'building'], f => f.optional()).validate(data);
    }

    return schema.validate(data);
};