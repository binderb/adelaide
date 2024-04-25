// Dev use only; this is a one-time script to delete feeds while troubleshooting import into new database model.

import dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/node-postgres";
import { Feed, TrackingData, feeds, users } from "./schema";
dotenv.config({ path: '.env.development.local' });
import { sql } from '@vercel/postgres';
import fs from 'fs';

async function main() {

  const db = drizzle(sql);
  
  console.log('Feed delete start...');
  await db.delete(feeds);
  console.log('Feed delete finished!');
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});