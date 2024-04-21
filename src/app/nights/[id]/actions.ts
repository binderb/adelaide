'use server';

import { db } from "@/db";
import { Night, NightTag, TrackingData, nights, tags } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addOrUpdateNight (formData: FormData) {
  if (!formData.get('date')) throw new Error('Date is required');
  if (!formData.get('user')) throw new Error('User is required');
  if (!formData.get('rating')) throw new Error('Rating is required');

  const existingNight = await db.query.nights.findFirst({
    where: eq(nights.date, formData.get('date') as string)
  });
  if (existingNight) {
    console.log('night exists. Updating existing night');
    await db.update(nights).set({
      user: Number(formData.get('user')),
      rating: formData.get('rating') as Night['rating'],
      date: formData.get('date') as string,
      notes: formData.get('notes') as string
    }).where(eq(nights.id, existingNight.id));
    // Delete all tags with the same night id
    await db.delete(tags).where(eq(tags.night, existingNight.id));
    // Add new tags
    const tagsArr = JSON.parse(formData.get('tags') as string) as string[];
    for (let tag of tagsArr) {
      await db.insert(tags).values({
        night: existingNight.id,
        text: tag as NightTag['text']
      });
    }
  }
  if (!existingNight) {
    console.log('no night exists. Creating new night');
    const response = await db.insert(nights).values({
      user: Number(formData.get('user')),
      rating: formData.get('rating') as Night['rating'],
      date: formData.get('date') as string,
      notes: formData.get('notes') as string
    }).returning();
    console.log('response', response[0]);
    const newNight = response[0];
    const tagsArr = JSON.parse(formData.get('tags') as string) as string[];
    for (let tag of tagsArr) {
      await db.insert(tags).values({
        night: newNight.id,
        text: tag as NightTag['text']
      });
    }
  }
  revalidatePath('/nights');
}

export async function deleteNight (date: string) {
  await db.delete(nights).where(eq(nights.date, date));
  revalidatePath('/nights');
}