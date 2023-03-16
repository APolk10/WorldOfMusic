import db from '../../database/index';

const checkUser = function(username: string, pin: number, session_id?: string) {
  // given a username find all favorites attached to that user
  console.log('checkUser got', username, pin, session_id)
  return db.query("UPDATE users SET session_id = $1 WHERE username = $2 AND pin = $3 RETURNING username;", [session_id, username, pin]);
}

export default checkUser;