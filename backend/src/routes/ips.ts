import express, {Request, Response} from 'express';
import { addIp, deleteIp, getAllIps } from '../controllers/ips.controller';

const router : express.Router = express.Router();


// get all app ips (this should not exist)
router.get('/', getAllIps);

// post app ip (Adds one or more IPs to the blacklist or whitelist.)
router.post('/', addIp);

// remove ip (Removes one or more IPs from the blacklist or whitelist.)
router.delete('/', deleteIp);

export default router;