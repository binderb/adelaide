ALTER TABLE "nights" ADD COLUMN "user" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nights" ADD CONSTRAINT "nights_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
