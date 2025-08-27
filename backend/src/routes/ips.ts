import express, {Request, Response} from 'express';

const router : express.Router = express.Router();


// get all app ips (this should not exist)
router.get('/', (req : Request, res : Response) => {
  // Logic to get all IPs
  res.status(200).send('List of all IPs');
});

// post app ip (Adds one or more IPs to the blacklist or whitelist.)
router.post('/', (req : Request, res : Response) => {
  const newIp = req.body;
  // Logic to add the new IP
  res.status(201).send(`IP added: ${newIp}`);
});

// remove ip (Removes one or more IPs from the blacklist or whitelist.)
router.delete('/:id', (req : Request, res : Response) => {
  const ipId = req.params.id;
  // Logic to remove the IP
  res.status(200).send(`IP removed: ${ipId}`);
});

export default router;