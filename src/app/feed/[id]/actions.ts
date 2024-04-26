'use server';

import { db } from "@/db";
import { feeds } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateBreastFeed(formData: FormData) {
  const id = Number(formData.get('id'));
  const type = formData.get('type') as "Left Breast" | "Right Breast";
  const length = Number(formData.get('length'));
  const timestamp = new Date(formData.get('timestamp') as string);
  const latch = formData.get('latch') as "Good" | "Ok" | "Bad" | null;

  await db.update(feeds).set({
    type,
    length,
    timestamp,
    latch,
  }).where(eq(feeds.id, id));
  revalidatePath(`/feed/${id}`);
}