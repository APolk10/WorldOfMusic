import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as Controllers from './controllers/index'
import db from '../database//index';
import * as path from 'path';

const expressSession =require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const axios = require('axios').default;
// axios.default.withCredential = true;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
// app.use(express.static(path.join(__dirname, '../public')));

app.use(expressSession({
  store: new pgSession({
    pool : db,
    tableName: "session",
    // other connect-pg-simple options
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false, // wont reset id on refresh
  saveUninitialized: true, // won't create new sessionID's every load (for one user)
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  remembered: false
  // other express-session options
}));

app.use(cors<Request>(({
  credentials: true,
  origin: 'http://localhost:3000'  // it's my React host
  })));
app.use(express.json());


const url: string = 'https://musicbrainz.org/ws/2/';

app.get('/', (req: Request, res: Response) => {
  let session_id = req.sessionID;
  console.log(session_id);
  app.set('remembered', true);
  // check to see if a user is associated with the session
  Controllers.fetchUserData(session_id)
  .then((response) => res.status(200).send(response.rows[0].username))
  .catch((response) => res.status(200).send('no name'))
})

/*     ROUTES     */
app.get('/username/:username', (req: Request, res: Response) => {
  let username: string = req.params.username;
  let session_id: string = req.sessionID;
  console.log('GET username route', username, session_id);
  // call controller to create a user along with session details
  Controllers.checkForUser(username)
    .then((response) => {
      if (response.rows.length < 1) {
        Controllers.createUser(username, session_id)
        .then(() => res.status(201).send('user created'))
        .catch((response) => console.log(response))
        // .catch((response) => res.status(200).send('error creating user'))
      } else {
        res.status(200).send('taken')
      }
    })
})

app.get('/profile/:username', (req: Request, res: Response) => {
  let username = req.params.username;
  let sid = req.session;
  console.log('get profile has this session attached', req.session);
  Controllers.fetchUserData(username)
    .then((response) => console.log(response))
})

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
