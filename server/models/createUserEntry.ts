import db from '../../database/index';
import checkUser from './checkUser';

const createUserEntry = function(user: string, session: string) {
  // check user, and if not present, create user
  return db.query("INSERT INTO users (username, session_id) VALUES ($1, $2);", [user, session])
}

export default createUserEntry;



