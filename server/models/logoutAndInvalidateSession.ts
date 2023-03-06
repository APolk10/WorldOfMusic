import db from '../../database/index';

const logoutAndInvalidateSession = function(sessionID: string, username: string) {
  // change the session date in table
  console.log('logout activated', username, sessionID);
  // return db.query(`UPDATE session SET expire = ${expirationDate} WHERE`)
  return db.query(`UPDATE users SET session_id = 'removed' WHERE username = $1;`, [username]);

}

export default logoutAndInvalidateSession;