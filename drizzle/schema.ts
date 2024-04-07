import { pgTable, unique, pgEnum, serial, varchar, foreignKey, integer, json } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const type = pgEnum("type", ['Dirty Diaper', 'Wet Diaper', 'Right Breast', 'Left Breast'])


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	username: varchar("username", { length: 256 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	first: varchar("first", { length: 256 }).notNull(),
	last: varchar("last", { length: 256 }).notNull(),
	role: varchar("role", { length: 100 }).notNull(),
},
(table) => {
	return {
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});

export const trackings = pgTable("trackings", {
	id: serial("id").primaryKey().notNull(),
	user: integer("user").notNull().references(() => users.id),
	type: type("type").notNull(),
	timestamp: json("timestamp").notNull(),
	notes: varchar("notes", { length: 500 }),
	length: varchar("length", { length: 10 }),
});