'use server';

import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";

export async function updateFeed(formData: FormData) {
  console.log('formData', formData);
  const id = Number(formData.get('id'));
  const type = formData.get('type') as "Left Breast" | "Right Breast";
  const length = Number(formData.get('length'));
  const timestamp = new Date(formData.get('timestamp') as string);

  await db.update(trackings).set({
    type,
    length,
    timestamp,
  }).where(eq(trackings.id, id));
}