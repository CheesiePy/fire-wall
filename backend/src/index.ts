import express , {Application, Request, Response, NextFunction} from 'express';
import ipRoute from './routes/ips.route';
import portRoute from './routes/ports.route';
import rulesRoute from './routes/rules.route';
import urlRoute from './routes/urls.route';
import cors from 'cors';
import logger from './config/logger';

import { db } from './config/db';
import { sql } from 'drizzle-orm';
import errorHandler from './middleware/errorHandler';
import  env  from './config/env';
import { connectWithRetry } from './utils/dbConnector';


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


const startServer = async () => {
    await connectWithRetry();
    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT} 🚀`);
    });
};

startServer();