import express, {Request, Response} from 'express';
import { deleteUrl, getAllUrls, addUrl} from '../controllers/urls.controller';

const router : express.Router = express.Router();


// get all app urls (this should not exist)
router.get('/', getAllUrls);

// post app url (Adds one or more domain names to the blacklist or whitelist)
router.post('/', addUrl);
  
// remove url (Removes one or more domain names from the blacklist or whitelist.)
router.delete('/', deleteUrl);

export default router;