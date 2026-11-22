import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const database = drizzle(neon(Bun.env.DATABASE_URL as string));