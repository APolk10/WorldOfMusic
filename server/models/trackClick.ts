import db from '../../database/index';

const trackClick = function(country: string, iso: string) {
  // update the global counter for this country
  return db.query(`INSERT INTO countries (country_name, iso_code, clicks) VALUES ('${country}', '${iso}', 1) ON CONFLICT (country_name) DO UPDATE SET clicks = countries.clicks + excluded.clicks;`)
}

export default trackClick;
