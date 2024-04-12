import { integer, json, pgEnum, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./schema_usersModule";
import { relations } from "drizzle-orm";

export type TrackingData = typeof trackings.$inferSelect;

export const trackingTypeEnum = pgEnum('type', [
  'Left Breast', 
  'Right Breast',
  'Diaper',
  'Med',
]);

export const trackingSubtypeEnum = pgEnum('subtype', [
  'Wet',
  'Dirty',
  'Both',
  'Tylenol',
  'Ibuprofen',
  'Stool Softener',
  'Vitamins'
]);  

export const trackings = pgTable('trackings', {
  id: serial('id').primaryKey(),
  user: integer('user').notNull().references(()=> users.id),
  type: trackingTypeEnum('type').notNull(),
  subtype: trackingSubtypeEnum('subtype'),
  timestamp: timestamp('timestamp').notNull(),
  notes: varchar('notes', { length: 500 }),
  length: integer('length'),
});

export const trackingsRelations = relations(trackings, ({one}) => ({
  user: one(users, {
    fields: [trackings.user],
    references: [users.id],
  }),
}));