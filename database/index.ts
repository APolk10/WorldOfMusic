import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
})

db.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log("Connected to PostgreSQL!");
})

export default db;