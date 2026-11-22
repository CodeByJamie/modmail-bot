import { varchar, pgTable, boolean, integer } from "drizzle-orm/pg-core";

export const ServerDataSchema = pgTable("server-data", {
    server_id: varchar("server_id").primaryKey().notNull(),
    owner_id: varchar("owner_id").notNull(),
    module_status: boolean("module_status").default(false),
    ticket_count: integer("total_ticket_count").default(0),
    staff_role: varchar("staff_role_id"),
});