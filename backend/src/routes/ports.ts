import express, {Request, Response} from 'express';
import { addPort, deletePort, getAllPorts } from '../controllers/ports.controller';

const router : express.Router = express.Router();


// get all app ports (this should not exist)
router.get('/', getAllPorts);

// post app port ( Adds one or more ports to the blacklist or whitelist.)
router.post('/', addPort);

// remove port (Removes one or more ports from the blacklist or whitelist.)
router.delete('/', deletePort);


export default router;