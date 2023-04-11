import db from '../../database/index';

const logFavorite = function(user: string, artist: string, country: string) {
  // add a favorite to the favorites table with the artist + country + user
  return db.query('INSERT INTO favorites (username, artist, country) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;', [user, artist, country]);
}

export default logFavorite;