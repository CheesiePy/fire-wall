import express , {Application, Request, Response, NextFunction} from 'express';

const server: Application = express();

server.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});