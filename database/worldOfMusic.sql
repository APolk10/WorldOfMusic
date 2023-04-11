CREATE TABLE countries
(
  id int,
  country_name varchar PRIMARY KEY,
  iso_code varchar,
  color varchar,
  clicks int
);

CREATE TABLE favorites
(
  id SERIAL PRIMARY KEY,
  username varchar,
  artist varchar,
  country varchar,
  UNIQUE (username, artist)
);

CREATE TABLE users
(
  id int,
  username varchar PRIMARY KEY,
  pin int,
  session_id varchar,
  created_on timestamp,
  visits int
);

-- FROM CONNECT PG SIMPLE --

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- seating the database can be done manually with these SQL queries.


-- permissions update: GRANT ALL ON table_name TO role_name;
-- GRANT USAGE, SELECT ON SEQUENCE favorites_id_seq to wom;
