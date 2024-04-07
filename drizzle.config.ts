import dotenv from "dotenv";
dotenv.config({path:'.env.development.local'});
import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  }
} satisfies Config;