'use server';

import { db } from "@/db";
import { feeds } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteFeed(formData: FormData) {
  'use server';
  const id = parseInt(formData.get('id') as string);
  await db.delete(feeds).where(eq(feeds.id, id)).execute();
  revalidatePath('/feed/log');
}

export async function refresh () {
  revalidatePath('/feed/log');
}