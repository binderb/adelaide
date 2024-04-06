import { json, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export type Config = typeof tracking.$inferSelect;

export const trackingTypeEnum = pgEnum('type', [
  'Left Breast', 
  'Right Breast',
  'Wet Diaper',
  'Dirty Diaper',
]);

export const tracking = pgTable('tracking', {
  id: serial('id').primaryKey(),
  type: trackingTypeEnum('type').notNull(),
  timestamp: json('timestamp').notNull(),
  notes: varchar('notes', { length: 500 }),
  length: varchar('length', { length: 10 }),
});