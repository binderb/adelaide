'use server';

import { db } from "@/db";
import { Feed, feeds } from "@/db/schema_trackerModule";
import { revalidatePath } from "next/cache";

export async function saveData(feedData:Feed) {
  try {
    const {id, ...dataToInsert} = feedData;
    await db.insert(feeds).values(dataToInsert).returning();
    revalidatePath('/feed');
  } catch (err: any) {
    throw err;
  }
}