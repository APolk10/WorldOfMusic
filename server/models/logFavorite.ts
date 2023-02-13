import db from '../../database/index';

const logFavorite = function(user: string, artist: string, country: string) {
  // add a favorite to the favorites table with the artist + country + user
  console.log('logFavorite activated');
}

export default logFavorite;