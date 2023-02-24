import db from '../../database/index';
import checkUser from './checkUser';

const createUserEntry = function(user: string, session: string) {
  // check user, and if not present, create user
  console.log(user, session);
  return db.query(`INSERT INTO users (username, session_id) VALUES ('${user}', '${session}');`)
}

export default createUserEntry;



