DO $$ BEGIN
 CREATE TYPE "latchrating" AS ENUM('Good', 'Ok', 'Bad');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "trackings" ADD COLUMN "latch" "latchrating";--> statement-breakpoint
ALTER TABLE "trackings" DROP COLUMN IF EXISTS "goodLatch";