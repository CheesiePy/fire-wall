import express , {Application, Request, Response, NextFunction} from 'express';
import ipRoute from './routes/ips';
import portRoute from './routes/ports';
import ruleRoute from './routes/rules';
import urlRoute from './routes/urls';
import cors from 'cors';

import pool from './config/db';
import errorHandler from './middleware/errorHandler';
import { createTables } from './data/createTables';


const app: Application = express();
const PORT = process.env.PORT || 5000;


//middleware
app.use(express.json());
app.use(cors());


// routes
app.use('/api/firewall/ip', ipRoute);
app.use('/api/firewall/port', portRoute);
app.use('/api/firewall/rule', ruleRoute);
app.use('/api/firewall/url', urlRoute);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// error handling middleware
app.use(errorHandler);

// create table before starting server

createTables();

// postgresql connection
app.get('/', async (req: Request, res: Response) => {
  console.log("Connecting to PostgreSQL...");
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`PostgreSQL connected: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    res.status(500).send('Error connecting to PostgreSQL');
  } finally {
    client.release();
  }
});


// server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});