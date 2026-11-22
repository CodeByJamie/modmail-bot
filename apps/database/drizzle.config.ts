import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./drizzle/schemas",
    dbCredentials: {
        url: Bun.env.DATABASE_URL as string,
    },
    out: "./drizzle/migration",
})