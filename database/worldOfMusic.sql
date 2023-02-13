CREATE TABLE countries
(
  id int PRIMARY KEY,
  country_name varchar,
  iso_code varchar,
  color varchar,
  clicks int
);

CREATE TABLE favorites
(
  id int PRIMARY KEY,
  username varchar,
  artist varchar,
  country varchar
);

CREATE TABLE users
(
  id int,
  username varchar UNIQUE,
  session_id varchar PRIMARY KEY,
  created_on timestamp,
  visits int
);

-- seating the database can be done manually with these SQL queries.