import express , {Application, Request, Response, NextFunction} from 'express';
import ipRoute from './routes/ips';
import portRoute from './routes/ports';
import ruleRoute from './routes/rules';
import urlRoute from './routes/urls';


const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use('/api/firewall/ip', ipRoute);
app.use('/api/firewall/port', portRoute);
app.use('/api/firewall/rule', ruleRoute);
app.use('/api/firewall/url', urlRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});