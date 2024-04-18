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
CREATE TABLE IF NOT EXISTS "nights" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"notes" varchar(500)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" "tagtext" NOT NULL
);
