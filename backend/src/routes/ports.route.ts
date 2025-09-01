import express, {Request, Response} from 'express';
import { addPort, deletePort, getAllPorts } from '../controllers/ports.controller';
import { validatePorts } from '../middleware/inputValidator';

const router : express.Router = express.Router();


// get all app ports (this should not exist)
router.get('/', getAllPorts);

// post app port ( Adds one or more ports to the blacklist or whitelist.)
router.post('/', validatePorts, addPort);

// remove port (Removes one or more ports from the blacklist or whitelist.)
router.delete('/', deletePort);


export default router;