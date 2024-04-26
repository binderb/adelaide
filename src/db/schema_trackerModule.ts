import { integer, json, pgEnum, pgTable, serial, varchar, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { users } from "./schema_usersModule";
import { relations } from "drizzle-orm";

export type TrackingData = typeof trackings.$inferSelect;
export type Feed = typeof feeds.$inferSelect;
export type Night = typeof nights.$inferSelect;
export type NightWithTags = Night & { tags: NightTag[] };
export type NightTag = typeof tags.$inferSelect;

export const trackingTypeEnum = pgEnum('type', [
  'Left Breast', 
  'Right Breast',
  'Diaper',
  'Med',
]);

export const feedTypeEnum = pgEnum('feedtype', [
  'Left Breast', 
  'Right Breast',
  'Breastmilk Bottle',
  'Formula Bottle',
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

export const nightRatingEnum = pgEnum('rating', [
  'Great',
  'Good',
  'Ok',
  'Bad',
  'Awful',
]);

export const latchRatingEnum = pgEnum('latchrating', [
  'Good',
  'Ok',
  'Bad',
]);

export const tagTextEnum = pgEnum('tagtext', [
  'Good Latches',
  'Cluster Feeding',
  'Painful Latches',
  'Very Fussy',
  'Long Wake Windows',
  'Interactive While Awake',
  'Gassy',
  'Lots of Poops',
  'Parents Slept Well',
  'Parents Exhausted',
  'Good Teamwork',
]);

export const trackings = pgTable('trackings', {
  id: serial('id').primaryKey(),
  user: integer('user').notNull().references(()=> users.id),
  type: trackingTypeEnum('type').notNull(),
  subtype: trackingSubtypeEnum('subtype'),
  timestamp: timestamp('timestamp').notNull(),
  notes: varchar('notes', { length: 500 }),
  latch: latchRatingEnum('latch'),
  length: integer('length'),
});

export const trackingsRelations = relations(trackings, ({one}) => ({
  user: one(users, {
    fields: [trackings.user],
    references: [users.id],
  }),
}));

export const feeds = pgTable('feeds', {
  id: serial('id').primaryKey(),
  user: integer('user').notNull().references(()=> users.id),
  type: feedTypeEnum('type').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  latch: latchRatingEnum('latch'),
  length: integer('length'),
  amount: decimal('amount', { precision: 4, scale: 2 }),
  notes: varchar('notes', { length: 500 }),
});

export const feedsRelations = relations(feeds, ({one}) => ({
  user: one(users, {
    fields: [feeds.user],
    references: [users.id],
  }),
}));


export const nights = pgTable('nights', {
  id: serial('id').primaryKey(),
  user: integer('user').notNull().references(()=> users.id),
  rating: nightRatingEnum('rating').notNull(),
  date: varchar('date', {length: 100 }).notNull(),
  notes: varchar('notes', { length: 500 }),
});

export const nightsRelations = relations(nights, ({many, one}) => ({
  tags: many(tags),
  user: one(users, {
    fields: [nights.user],
    references: [users.id],
  }),
}));


export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  text: tagTextEnum('text').notNull(),
  night: integer('night').notNull().references(()=> nights.id),
});

export const tagsRelations = relations(tags, ({one}) => ({
  night: one(nights, {
    fields: [tags.night],
    references: [nights.id],
  }),
}));