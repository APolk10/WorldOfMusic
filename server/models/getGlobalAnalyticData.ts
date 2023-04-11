import db from '../../database/index';

const getGlobalAnalyticData = function() {
  // grabs the clicks for each country in the country table
  return db.query('SELECT (country_name, clicks) FROM countries;');
}

export default getGlobalAnalyticData;
