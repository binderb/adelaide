'use server';

import { db } from "@/db";
import { TrackingData, trackings } from "@/db/schema_trackerModule";
import { revalidatePath } from "next/cache";

export async function saveData(trackingData:TrackingData) {
  try {
    const {id, ...dataToInsert} = trackingData;
    await db.insert(trackings).values(dataToInsert).returning();
    revalidatePath('/feed');
  } catch (err: any) {
    throw err;
  }
}