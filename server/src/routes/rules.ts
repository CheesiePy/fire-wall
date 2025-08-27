import express, {Request, Response} from 'express';

const router : express.Router = express.Router();


// get all app rules (Retrieves all current firewall rules for IPs, URLs, and ports in both blacklist and whitelist.)
router.get('/', (req : Request, res : Response) => {
  // Logic to get all rules
  res.status(200).send('List of all rules');
});

// post app rule
router.patch('/', (req : Request, res : Response) => {
  const newRule = req.body;
  // Logic to add the new rule
  res.status(201).send(`Rule added: ${newRule}`);
});

// remove rule
router.delete('/:id', (req : Request, res : Response) => {
  const ruleId = req.params.id;
  // Logic to remove the rule
  res.status(200).send(`Rule removed: ${ruleId}`);
});

export default router;