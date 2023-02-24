import db from '../../database/index';

const checkUser = function(username: string) {
  // given a username find all favorites attached to that user
  return db.query(`SELECT * FROM users WHERE username = '${username}';`);
}

export default checkUser;