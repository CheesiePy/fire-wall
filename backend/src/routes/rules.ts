import express, {Request, Response} from 'express';
import { getAllRules, updateRule } from '../controllers/rules.controller';

const router : express.Router = express.Router();


// get all app rules (Retrieves all current firewall rules for IPs, URLs, and ports in both blacklist and whitelist.)
router.get('/', getAllRules);
// post app rule
router.patch('/', updateRule);



export default router;