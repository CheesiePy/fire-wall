import express, {Request, Response} from 'express';
import { createRules, getAllRules, updateRules } from '../controllers/rules.controller';

const router : express.Router = express.Router();


// generate the initial rules and store in rules table
router.post('/generate', createRules);
// get all app rules (Retrieves all current firewall rules for IPs, URLs, and ports in both blacklist and whitelist.)
router.get('/', getAllRules);
// post app rule
router.patch('/', updateRules);



export default router;