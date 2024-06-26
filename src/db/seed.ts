import { Pool } from "pg";
import dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema";
import bcrypt from 'bcrypt';
dotenv.config({path: '.env.development.local'});
import { sql } from '@vercel/postgres';

async function main () {
  const db = drizzle(sql);
  const data:(typeof users.$inferInsert)[] = [];
  data.push({
    username: process.env.POSTGRES_SEED_USERNAME!,
    password: await bcrypt.hash(process.env.POSTGRES_SEED_PASSWORD || '', 10),
    first: process.env.POSTGRES_SEED_FIRST!,
    last: process.env.POSTGRES_SEED_LAST!,
    role: process.env.POSTGRES_SEED_ROLE!,
  });

  console.log('Seed start...');
  await db.insert(users).values(data);
  console.log('Seed finished!');
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});