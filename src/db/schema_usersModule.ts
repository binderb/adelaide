import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { feeds, trackings } from "./schema_trackerModule";

export type User = typeof users.$inferSelect;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', {length: 256}).unique().notNull(),
  password: varchar('password', {length: 256}).notNull(),
  first: varchar('first', {length: 256}).notNull(),
  last: varchar('last', {length: 256}).notNull(),
  role: varchar('role', {length: 100}).notNull(),
});

export const usersRelations = relations(users, ({many}) => ({
  trackingData: many(trackings),
  feedData: many(feeds),
}));