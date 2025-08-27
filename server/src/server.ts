import express , {Application, Request, Response, NextFunction} from 'express';
import ipRoute from './routes/ips';
import portRoute from './routes/ports';
import ruleRoute from './routes/rules';
import urlRoute from './routes/urls';


const server: Application = express();
const PORT = process.env.PORT || 5000;

server.use('/api/firewall/ip', ipRoute);
server.use('/api/firewall/port', portRoute);
server.use('/api/firewall/rule', ruleRoute);
server.use('/api/firewall/url', urlRoute);

server.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});