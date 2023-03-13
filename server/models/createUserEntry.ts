import db from '../../database/index';
import checkUser from './checkUser';

const createUserEntry = function(user: string, pin: number, session: string) {
  // check user, and if not present, create user
  return db.query("INSERT INTO users (username, pin, session_id) VALUES ($1, $2, $3);", [user, pin, session])
}

export default createUserEntry;



