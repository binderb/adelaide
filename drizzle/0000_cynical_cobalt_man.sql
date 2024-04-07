DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Left Breast', 'Right Breast', 'Wet Diaper', 'Dirty Diaper', 'Tylenol', 'Ibuprofen');
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
CREATE TABLE IF NOT EXISTS "trackings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"type" "type" NOT NULL,
	"timestamp" timestamp NOT NULL,
	"notes" varchar(500),
	"length" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trackings" ADD CONSTRAINT "trackings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
