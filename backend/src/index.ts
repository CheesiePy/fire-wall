import express , {Application, Request, Response, NextFunction} from 'express';
import ipRoute from './routes/ips';
import portRoute from './routes/ports';
import rulesRoute from './routes/rules';
import urlRoute from './routes/urls';
import cors from 'cors';
import logger from './config/logger';

import { db } from './config/db';
import { sql } from 'drizzle-orm';
import errorHandler from './middleware/errorHandler';
import  env  from './config/env';


const app: Application = express();
const PORT = env.PORT || 5000;


//middleware
app.use(express.json());
app.use(cors());


// routes
app.use('/api/firewall/ip', ipRoute);
app.use('/api/firewall/port', portRoute);
app.use('/api/firewall/url', urlRoute);
app.use('/api/firewall/rules', rulesRoute);


// error handling middleware
app.use(errorHandler);


// postgresql connection
app.get('/', async (req: Request, res: Response) => {
  logger.info("Connecting to PostgreSQL...");
  try {
    const result = await db.execute(sql`SELECT NOW()`);
    const now = result.rows[0] ? (result.rows[0] as any) : 'Not Available';
    res.send(`PostgreSQL connected: ${now}`);
  } catch (error) {
    logger.error('Error connecting to PostgreSQL:', error);
    res.status(500).send('Error connecting to PostgreSQL');
  }
});


// server running
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});