import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const ipsSchema = Joi.object(
    {
        values: Joi.array().items(Joi.string().ip()).required(),
        mode: Joi.string().valid('blacklist', 'whitelist').required()
    }
)

export const validateIps = (req : Request, res: Response, next: NextFunction) => {
    const { error } = ipsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            error: error.details?.[0]?.message

        });
    }
    next();
};

const urlsSchema = Joi.object(
    {
        values: Joi.array().items(Joi.string().uri()).required(),
        mode: Joi.string().valid('blacklist', 'whitelist').required()
    }
)

// currently not using it becouse i want domains without protocol to also pass throw. in utils/validator.ts you can find the validator.
export const validateUrls = (req: Request, res: Response, next: NextFunction) => {
    const { error } = urlsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details?.[0]?.message
        });
    }
    next();
};



const portsSchema = Joi.object(
    {
        values: Joi.array().items(Joi.number().port()).required(),
        mode: Joi.string().valid('blacklist', 'whitelist').required()
    }
);


export const validatePorts = (req: Request, res: Response, next: NextFunction) => {
    const { error } = portsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details?.[0]?.message
        });
    }
    next();
};
