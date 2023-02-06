import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import db from '../database//index';

const axios = require('axios').default;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors<Request>());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

const url: string = 'https://musicbrainz.org/ws/2/';

app.get('/getCountryData/:country', (req: Request, res: Response) => {
  let isoCode: string = req.params.country;
  axios.get(`${url}artist/?query=country:${isoCode}`)
    .then((response: { data: {} }) => res.status(200).send(response.data))
    .catch((error: Error) => console.log(error))
})

app.post('/trackClick', (req: Request, res: Response) => {
  let country: string = req.body.country;
  // once database is established update the counter table for the country provided
  console.log('user clicked', country)
})


app.listen(port);
console.log(`Server listening at http:/localhost:${port}`);
