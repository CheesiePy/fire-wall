import { Response, Request, NextFunction } from 'express';
import {addPortService, deletePortService, getAllPortsService} from '../models/port.model';
// standardize response format
const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const getAllPorts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ports = await getAllPortsService();
        if(!ports) return handleResponse(res, 404, 'No ports found');
        handleResponse(res, 200, 'Ports retrieved successfully', ports);
    } catch (error) {
        next(error);
    }
};

export const addPort = async (req: Request, res: Response, next: NextFunction) => {
    const { values, mode } = req.body;
    try {
        const newPort = await addPortService(values, mode);
        if (!newPort) return handleResponse(res, 400, 'Failed to add port');
        handleResponse(res, 201, 'Port added successfully', newPort);
    } catch (error) {
        next(error);
    }
};

export const deletePort = async (req: Request, res: Response, next: NextFunction) => {
    const { values, mode } = req.body;
    console.log('Request Body:', req.body);
    try {
        const deletedPort = await deletePortService(values, mode);
        if (!deletedPort) return handleResponse(res, 404, 'Port not found');
        handleResponse(res, 200, 'Port deleted successfully', deletedPort);
    } catch (error) {
        next(error);
    }
};