import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as Controllers from './controllers/index'
import db from '../database//index';
import * as path from 'path';
const axios = require('axios').default;
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors<Request>(({
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  origin: 'http://localhost:3000'
  })));

declare module 'express-session' {
  interface SessionData {
    authenticated: boolean
  }
}

app.use(expressSession({
  store: new pgSession({
    pool : db,
    tableName: "session",
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    secure: false,
    authenticated: false,
    // sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  }
}));


// app.use(express.static(path.join(__dirname, '../public')));


const MB_url: string = 'https://musicbrainz.org/ws/2/';

/*     ROUTES     */

app.get('/checkCredentials', (req: Request, res: Response) => {
  // if cookie - check it - if not, ask for credentials
  let { sessionID } = req;

  if (req.sessionID) {
    // if the cookie is found, find user data and return if found
    Controllers.fetchUserData(sessionID)
    .then((response) => res.status(200).send(response.rows[0].username))
    .catch((response) => res.status(200).send('no name found'))
  } else {
    // if unauthorized/no cookie, return error
    res.status(403).send('unauthorized client')
  }
})

// log a user in with their credentials
app.post('/login', (req: Request, res: Response) => {
  const { username, pin } = req.body;
  const session_id: string = req.sessionID;

  console.log('/login', req.body)

  if (username && pin) {
    // checks for credentials and handles invalid input
    Controllers.checkForUser(username)
    .then((response) => {
      if (response.rows.length < 1) {
        Controllers.createUser(username, session_id)
        .then(() => {
          req.session.authenticated = true;
          res.status(201).send('user created, pin saved')})
        .catch(() => res.status(403).send('error creating user'))
      } else {
        res.status(403).send('taken')
      }
    })
  } else if (username && !pin) {
    res.json({ msg: 'no pin' })
  } else if (!username && pin) {
    res.json({ msg: 'no username' })
  } else if (!username && !pin) {
    res.json({ msg: 'no credentials provided' })
  }

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
  let username = req.body.username;
  let session = req.sessionID;
  // req.session.cookie.expires = new Date(1970);
  // update database session so that next fetch is outdated.

  console.log(req.session)
  // res.cookie('connect.sid', '', {
  //   path: '/',
  //   domain: 'localhost',
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: false,
  //   expires: new Date(1970),
  // });

  req.session.destroy(() => {
    res.clearCookie('connect.sid', {
      path: '/',
      domain: '/',
      secure: false,
      sameSite: false,
      expires: new Date(1970)
    });
    res.status(200).send('user logged out');
  })

})


/* END ROUTES  */

app.listen(port);
console.log(`Server listening at http:/localhost:${port}`);

module.exports = app;
