'use server';
import { db } from "@/db";
import { TrackingData, trackings } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addDiaper(formData: FormData) {
  await db.insert(trackings).values({
    type: 'Diaper',
    user: parseInt(formData.get('user') as string),
    subtype: formData.get('subtype') as TrackingData['subtype'],
    timestamp: new Date(formData.get('timestamp') as string),
  });
  revalidatePath('/diapers');
}