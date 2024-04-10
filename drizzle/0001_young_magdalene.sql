DO $$ BEGIN
 CREATE TYPE "subtype" AS ENUM('Wet', 'Dirty', 'Tylenol', 'Ibuprofen', 'Stool Softener');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'Diaper';--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'Med';--> statement-breakpoint
ALTER TABLE "trackings" ADD COLUMN "subtype" "subtype";