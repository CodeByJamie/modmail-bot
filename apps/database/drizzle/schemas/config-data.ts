import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const ConfigDataSchema = pgTable("config-data", {
    server_id: varchar("server_id").primaryKey().notNull(),
    opening_message: varchar("opening_message").default("📩 Please press the button below to get in contact with our staff team!").notNull(),
    button_label: varchar("button_label").default("Create Ticket"),
    response_time: varchar("response_time").default("1 hour"),
    channel_name: varchar("ticket_channel_name").default("{count}-{username}")
})