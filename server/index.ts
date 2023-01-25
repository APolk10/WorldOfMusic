import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors = require('cors');

const axios = require('axios').default;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors<Request>());
app.use(express.json())

app.get('/getCountryData', (req: Request, res: Response) => {
  console.log('server GET successful')
})

app.listen(port);
console.log(`Server listening at http:/localhost:${port}`);
