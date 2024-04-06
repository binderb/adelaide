DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Left Breast', 'Right Breast', 'Wet Diaper', 'Dirty Diaper');
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
CREATE TABLE IF NOT EXISTS "tracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"type" "type" NOT NULL,
	"timestamp" json NOT NULL,
	"notes" varchar(500),
	"length" varchar(10)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tracking" ADD CONSTRAINT "tracking_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
