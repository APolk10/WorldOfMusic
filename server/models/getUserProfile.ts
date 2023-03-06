import db from '../../database/index';

const getUserProfile = function(session_id: string) {
  // using the session id grab the username
  return db.query("SELECT * FROM users WHERE session_id = $1;", [session_id])
}

export default getUserProfile;
