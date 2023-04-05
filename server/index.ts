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
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors<Request>(({
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  origin: 'http://localhost:3000'
  })));

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
    maxAge: 1000 * 60 * 60 * 24 * 30,
  }
}));


// app.use(express.static(path.join(__dirname, '../public')));

declare module 'express-session' {
  interface SessionData {
    authenticated: boolean
  }
}

const MB_url: string = 'https://musicbrainz.org/ws/2/';

/*     ROUTES     */

// check a client for ID to retrieve a user via session
app.get('/checkCredentials', (req: Request, res: Response) => {
  let { sessionID } = req;

  if (req.sessionID) {
    Controllers.fetchUserData(sessionID)
    .then((response) => res.status(200).send(response.rows[0].username))
    .catch((response) => res.status(200).send('no name found'))
  } else {
    res.status(403).send('unauthorized client')
  }
})

// create a new user and session
app.post('/newUserLogin', (req: Request, res: Response) => {
  const { username, pin } = req.body;
  const session_id: string = req.sessionID;

  if (username && pin) {
    // checks for availability of name, and creates the user if possible
    Controllers.checkForUser(username, pin)
    .then((response) => {
      if (response.rows.length < 1) {
        Controllers.createUser(username, pin, session_id)
        .then(() => {
          req.session.authenticated = true;
          res.status(201).send( { msg: 'user created, pin saved', username: username })
        })
        .catch(() => res.status(403).send('error creating user'))
      } else {
        req.session.authenticated = false;
        res.status(403).send('taken')
      }
    })
  } else if (username && !pin) {
    res.json({ msg: 'no pin provided' })
  } else if (!username && pin) {
    res.json({ msg: 'no username provided' })
  } else if (!username && !pin) {
    res.json({ msg: 'no credentials provided' })
  }

})

// retrieve a user based on username + pin submission
app.post('/existingUserLogin', (req: Request, res: Response) => {
  const { username, pin } = req.body;
  const session_id: string = req.sessionID;

  if (username && pin) {
    Controllers.checkForUser(username, pin, session_id)
    .then((response) => {
      req.session.authenticated = true;
      res.status(200).send(response.rows)
  })
    .catch((error) => res.send(error))
    }
})

// app.get('/profile/:username', (req: Request, res: Response) => {
//   let username = req.params.username;
//   let sid = req.session;
//   Controllers.fetchUserData(username)
//     .then((response) => console.log(response))
// })

app.get('/getCountryData/:country', (req: Request, res: Response) => {
  let isoCode: string = req.params.country;
  axios.get(`${MB_url}artist/?query=country:${isoCode}`)
    .then((response: { data: {} }) => res.status(200).send(response.data))
    .catch((error: Error) => console.log(error))
})

app.get('/getGlobalAnalytics', (req: Request, res: Response) => {
  Controllers.fetchGlobalAnalyticData()
    .then((response) => res.status(200).send(response.rows))
    .catch((error) => console.log(error));
})

app.post('/addFavorite', (req: Request, res: Response) => {
  let countryToAdd: string = req.body.country;
  let username: string = req.body.username;

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
})

app.post('/logout', (req: Request, res: Response) => {

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

