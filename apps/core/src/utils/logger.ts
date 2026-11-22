export enum LogType {
    INFO = "info",
    WARNING = "warning",
    CRITICAL = "critical",
    CLIENT = "client",
    DATABASE = "database",
    SYSTEM = "system",
}

export class ConsoleLogger {

    /**
     * The current time (formatted locally)
     */
    private static get timestamp(): string {
        return (`[${new Date().toLocaleTimeString()}]`);
    }

    /**
     * A simple divider to make the console more readable
     */
    private static get divider(): string {
        return ("|");
    }

    /**
     * Display a notification in the console
     * @param {LogType} type - The type of notification to display
     * @param {string} message - The notification to display
     */
    public static notification(type: LogType, message: string): void {
        console.log(`${Bun.env.NODE_ENV?.toLowerCase() !== "production" ? `${this.timestamp} ${this.divider}` : ""} ${type.toUpperCase()} ${this.divider} ${message}`);
    }
}
