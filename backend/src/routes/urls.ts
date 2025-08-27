import express, {Request, Response} from 'express';

const router : express.Router = express.Router();


// get all app urls (this should not exist)
router.get('/', (req : Request, res : Response) => {
  // Logic to get all URLs
  res.status(200).send('List of all URLs');
});

// post app url (Adds one or more domain names to the blacklist or whitelist)
router.post('/', (req : Request, res : Response) => {
  const newUrl = req.body;
  // Logic to add the new URL
  res.status(201).send(`URL added: ${newUrl}`);
});

// remove url (Removes one or more domain names from the blacklist or whitelist.)
router.delete('/:id', (req : Request, res : Response) => {
  const urlId = req.params.id;
  // Logic to remove the URL
  res.status(200).send(`URL removed: ${urlId}`);
});

export default router;