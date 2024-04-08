'use server';

import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteFeed(formData: FormData) {
  'use server';
  const id = parseInt(formData.get('id') as string);
  await db.delete(trackings).where(eq(trackings.id, id)).execute();
  revalidatePath('/feed/log');
}