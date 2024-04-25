CREATE TABLE IF NOT EXISTS "feeds" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"type" "type" NOT NULL,
	"timestamp" timestamp NOT NULL,
	"latch" "latchrating",
	"length" integer,
	"amount" numeric(3, 1),
	"notes" varchar(500)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeds" ADD CONSTRAINT "feeds_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
