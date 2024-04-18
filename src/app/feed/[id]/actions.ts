'use server';

import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateFeed(formData: FormData) {
  const id = Number(formData.get('id'));
  const type = formData.get('type') as "Left Breast" | "Right Breast";
  const length = Number(formData.get('length'));
  const timestamp = new Date(formData.get('timestamp') as string);
  const latch = formData.get('latch') as "Good" | "Ok" | "Bad" | null;

  await db.update(trackings).set({
    type,
    length,
    timestamp,
    latch,
  }).where(eq(trackings.id, id));
  revalidatePath(`/feed/${id}`);
}