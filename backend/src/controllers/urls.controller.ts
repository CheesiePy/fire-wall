import { NextFunction, Response, Request} from 'express';
import { addUrlService, deleteUrlService, getAllUrlsService } from '../models/url.model';

// standardize response format
const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const addUrl = async (req: Request, res: Response, next: NextFunction) => {
    const values = req.body.values;
    const mode = req.body.mode;
    try {
        const newUrl = await addUrlService(values, mode);
        handleResponse(res, 201, 'URL added successfully', newUrl);
    } catch (error) {
        next(error);
    }
};

export const getAllUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urls = await getAllUrlsService();
        if (!urls) return handleResponse(res, 404, 'No URLs found');
        handleResponse(res, 200, 'URLs retrieved successfully', urls);
    } catch (error) {
        next(error);
    }
};


export const deleteUrl = async(req: Request, res: Response, next: NextFunction) => {
    const values = req.body.values;
    const mode = req.body.mode;
    try {
        const deletedUrl = await deleteUrlService(values, mode);
        if (!deletedUrl) return handleResponse(res, 404, 'URL not found');
        handleResponse(res, 200, 'URL deleted successfully', deletedUrl);
    } catch (error) {
        next(error);
    }
};