import e, { Response, Request, NextFunction } from 'express';
import { getAllRulesService, updateRuleService } from '../models/rule.model';

// standardize response format
const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const getAllRules = async (req: e.Request, res: Response, next: e.NextFunction) => {
    try {
        const rules = await getAllRulesService();
        if (!rules) return handleResponse(res, 404, 'No rules found');
        handleResponse(res, 200, 'Rules retrieved successfully', rules);
    } catch (error) {
        next(error);
    }
};

export const updateRule = async (req: Request, res: Response, next: NextFunction) => {
    const { rule, list, ids, active } = req.body;
    try {
        const updatedRule = await updateRuleService(rule, list, ids, active);
        if (!updatedRule) return handleResponse(res, 404, 'Rule not found');
        handleResponse(res, 200, 'Rule updated successfully', updatedRule);
    } catch (error) {
        next(error);
    }
};
