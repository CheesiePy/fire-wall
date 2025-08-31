import { Response, Request, NextFunction } from 'express';
import { getAllRulesService,updateRulesService, generateAndStoreRules} from '../models/rule.model';

// standardize response format
const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createRules = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await generateAndStoreRules();
        handleResponse(res, 201, 'Rules created successfully');
    } catch (error) {
        next(error);
    }
};

export const getAllRules = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = await getAllRulesService();
        if (!rules) return handleResponse(res, 404, 'No rules found ❌');
        handleResponse(res, 200, 'Rules retrieved successfully ✅', rules);
    } catch (error) {
        next(error);
    }
};

export const updateRules = async (req: Request, res: Response, next: NextFunction) => {
    const urls = req.body.urls;
    const ports = req.body.ports;
    const ips = req.body.ips;
    try {
        const updatedRule = await updateRulesService({ urls, ports, ips });
        if (!updatedRule) return handleResponse(res, 404, 'Rule not found ❌');
        handleResponse(res, 200, 'Rule updated successfully ✅', updatedRule);
    } catch (error) {
        next(error);
    }
};
