DO $$ BEGIN
 CREATE TYPE "latchrating" AS ENUM('Good', 'Ok', 'Bad');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "rating" AS ENUM('Great', 'Good', 'Ok', 'Bad', 'Awful');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "tagtext" AS ENUM('Good Latches', 'Cluster Feeding', 'Painful Latches', 'Very Fussy', 'Long Wake Windows', 'Interactive While Awake', 'Gassy', 'Lots of Poops', 'Parents Slept Well', 'Parents Exhausted', 'Good Teamwork');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "subtype" AS ENUM('Wet', 'Dirty', 'Both', 'Tylenol', 'Ibuprofen', 'Stool Softener', 'Vitamins');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Left Breast', 'Right Breast', 'Diaper', 'Med');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"first" varchar(256) NOT NULL,
	"last" varchar(256) NOT NULL,
	"role" varchar(100) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nights" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"rating" "rating" NOT NULL,
	"date" timestamp NOT NULL,
	"notes" varchar(500)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" "tagtext" NOT NULL,
	"night" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trackings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"type" "type" NOT NULL,
	"subtype" "subtype",
	"timestamp" timestamp NOT NULL,
	"notes" varchar(500),
	"latch" "latchrating",
	"length" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nights" ADD CONSTRAINT "nights_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_night_nights_id_fk" FOREIGN KEY ("night") REFERENCES "nights"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trackings" ADD CONSTRAINT "trackings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
