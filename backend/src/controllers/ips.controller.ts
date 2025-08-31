import {Request, Response, NextFunction} from 'express';
import { addIpService, getAllIpsService, deleteIpService} from '../models/ip.model';

// standardize response format
const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const addIp = async (req: Request, res: Response, next: NextFunction) => {
    const {values, mode} = req.body;
    try {
        const newIp = await addIpService(values, mode);
        handleResponse(res, 201, `IPs added to ${mode} successfully ✅`, newIp);
    } 
    catch (error) {
        next(error);
    }
};

export const getAllIps = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const newIp = await getAllIpsService();
    handleResponse(res, 200, 'IPs retrieved successfully ✅', newIp);
    } 
    catch (error) {
        next(error);
    }
};

export const deleteIp = async (req: Request, res: Response, next: NextFunction) => {
    const values : string[] = req.body.values;
    const mode : string = req.body.mode;
    try {
    const newIp = await deleteIpService(values, mode);
    if (!newIp) return handleResponse(res, 404, 'IP not found ❌');
    handleResponse(res, 200, 'IP deleted successfully ✅', newIp);
    } 
    catch (error) {
        next(error);
    }
};



