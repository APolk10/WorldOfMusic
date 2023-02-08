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
  email varchar,
  country varchar
);

CREATE TABLE users
(
  id int,
  username varchar,
  email varchar PRIMARY KEY,
  hash_string varchar,
  token varchar,
  created_on timestamp
);

-- seating the database can be done manually with these SQL queries.