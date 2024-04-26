// Dev use only; this is a one-time import script to import feeds from the old database model.

import dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/node-postgres";
import { Feed, TrackingData, feeds, users } from "./schema";
dotenv.config({ path: '.env.development.local' });
import { sql } from '@vercel/postgres';
import fs from 'fs';

async function main() {
  // read the trackings.json file in the project root
  const filePath = './feeds.json';
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const trackings = JSON.parse(rawData) as TrackingData[];


  const db = drizzle(sql);
  const data: (typeof feeds.$inferInsert)[] = [];
  for (const tracking of trackings) {
    if (tracking.type === 'Left Breast' || tracking.type === 'Right Breast') {
      data.push({
        user: tracking.user,
        type: tracking.type as Feed['type'],
        // Subtract 5 hours to the timestamp to account for the timezone difference
        timestamp: new Date(new Date(tracking.timestamp).valueOf() - 5 * 60 * 60 * 1000),
        latch: tracking.latch,
        length: tracking.length,
        amount: null,
        notes: tracking.notes,
      });
    }
  }

  console.log('Feed import start...');
  await db.insert(feeds).values(data);
  console.log('Feed import finished!');
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});