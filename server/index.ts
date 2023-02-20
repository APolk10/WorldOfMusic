import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as Controllers from './controllers/index'
import db from '../database//index';

const expressSession =require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const axios = require('axios').default;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(expressSession({
  store: new pgSession({
    pool : db,
    tableName: "session",
    // connect-pg-simple options
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
  // express-session options
}));

app.use(cors<Request>());
app.use(express.json());

const url: string = 'https://musicbrainz.org/ws/2/';

app.get('/', (req: Request, res: Response) => {
  console.log('Cookies', req.cookies)
  // the flow should be
    // 1. Client Sends request to "/"
    // 2. Server checks the cookies for the session id
      // 2a. If session id, access database for session data -> return that data to populate the screen
      // 2b. If not, ask user for username
        // 2ba. set a session id with new user and create session in database
    // 3. Proceed to website
})

/*     ROUTES     */
app.get('/getCountryData/:country', (req: Request, res: Response) => {
  let isoCode: string = req.params.country;
  axios.get(`${url}artist/?query=country:${isoCode}`)
    .then((response: { data: {} }) => res.status(200).send(response.data))
    .catch((error: Error) => console.log(error))
})

app.get('/getGlobalAnalytics', (req: Request, res: Response) => {
  console.log('getGlobalAnalytics')
  // Controllers.fetchGlobalAnalyticData();
})

app.post('/addFavorite', (req: Request, res: Response) => {
  let countryToAdd: string = req.body.country;
  let username: string = req.body.username;
  // call controller to handle next steps
  Controllers.addFavorite(countryToAdd, username);
})

app.post('/removeFavorite', (req: Request, res: Response) => {
  let countryToRemove: string = req.body.country;
  // call controller to handle next steps
})

app.post('/trackClick', (req: Request, res: Response) => {
  let countryClicked: string = req.body.country;
  // call controller to handle next steps
})


/* END ROUTES  */
app.listen(port);
console.log(`Server listening at http:/localhost:${port}`);
