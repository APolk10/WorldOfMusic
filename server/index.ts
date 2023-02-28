import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as Controllers from './controllers/index'
import db from '../database//index';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

const expressSession =require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const axios = require('axios').default;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cookieParser())
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
  cookie: {
    name: 'wom',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  remembered: false,
  unset: 'destroy'
  // other express-session options
}));

app.use(cors<Request>(({
  credentials: true,
  origin: 'http://localhost:3000'
  })));

app.use(express.json());

const MB_url: string = 'https://musicbrainz.org/ws/2/';

// Cookie/Session check
app.get('/', (req: Request, res: Response) => {
  let session_id = req.sessionID;
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

  Controllers.checkForUser(username)
    .then((response) => {
      if (response.rows.length < 1) {
        Controllers.createUser(username, session_id)
        .then(() => res.status(201).send('user created'))
        .catch((response) => res.status(200).send('error creating user'))
      } else {
        res.status(200).send('taken')
      }
    })
})

app.get('/login/:username/:pin', (req: Request, res: Response) => {
  console.log(req.params);
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
  axios.get(`${MB_url}artist/?query=country:${isoCode}`)
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
  let iso_code: string = req.body.iso;
  Controllers.incrementClickData(countryClicked, iso_code)
    .then((response) => res.status(200).send('click tracked'))
    .catch((error) => console.log(error))
  // call controller to handle next steps
})

app.post('/logout', (req: Request, res: Response) => {
  let username = req.body.name;
  req.session.cookie.expires = new Date(1970);
  // update database session so that next fetch is outdated.
  //Controllers.invalidateSession()
  req.session.destroy(() => {
    res.redirect('/');
  })
})


/* END ROUTES  */
app.listen(port);
console.log(`Server listening at http:/localhost:${port}`);

module.exports = app;
