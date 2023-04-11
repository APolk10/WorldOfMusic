import db from '../../database/index';

const getFavorites = function(user: string) {
  // given a username find all favorites attached to that user
  return db.query('SELECT * FROM favorites WHERE username = $1', [user]);
}

export default getFavorites;