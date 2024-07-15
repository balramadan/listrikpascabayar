import { config } from "dotenv";
config();
import pg from "pg";

const { Client } = pg;
// const pw = process.env.VITE_PASSWORD_DB;
// console.log(process.env)

const client = new Client({
  user: "postgres.hoxbxnpxojpepygogkds",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: "mwnNW4c43vWEHFsV",
  port: 6543,
});

// try {
//   await client.connect();
//   console.log("Connected to database");
// } catch (error) {
//   console.error("Error connecting to database", error);
// }

export default client;
