import { integer, json, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./schema_usersModule";
import { relations } from "drizzle-orm";

export type TrackingData = typeof trackings.$inferSelect;

export const trackingTypeEnum = pgEnum('type', [
  'Left Breast', 
  'Right Breast',
  'Wet Diaper',
  'Dirty Diaper',
]);

export const trackings = pgTable('tracking', {
  id: serial('id').primaryKey(),
  user: integer('user').notNull().references(()=> users.id),
  type: trackingTypeEnum('type').notNull(),
  timestamp: json('timestamp').notNull(),
  notes: varchar('notes', { length: 500 }),
  length: varchar('length', { length: 10 }),
});

export const trackingsRelations = relations(trackings, ({one}) => ({
  user: one(users, {
    fields: [trackings.user],
    references: [users.id],
  }),
}));