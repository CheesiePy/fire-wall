import express, {Request, Response} from 'express';

const router : express.Router = express.Router();


// get all app ports (this should not exist)
router.get('/', (req : Request, res : Response) => {
  // Logic to get all ports
  res.status(200).send('List of all ports');
});

// post app port ( Adds one or more ports to the blacklist or whitelist.)
router.post('/', (req : Request, res : Response) => {
  const newPort = req.body;
  // Logic to add the new port
  res.status(201).send(`Port added: ${newPort}`);
});

// remove port (Removes one or more ports from the blacklist or whitelist.)
router.delete('/:id', (req : Request, res : Response) => {
  const portId = req.params.id;
  // Logic to remove the port
  res.status(200).send(`Port removed: ${portId}`);
});

export default router;