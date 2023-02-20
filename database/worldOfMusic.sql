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