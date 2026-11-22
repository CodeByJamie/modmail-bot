import { Glob } from "bun";
import { Client, Partials } from "discord.js";
import { join } from "node:path";
import { ConsoleLogger, LogType } from "../utils/logger";

export class ModMailClient extends Client {

    // TODO: Yet to declare types on these variables (they will be a discord collection of their respective categories)
    public commands: any;
    public buttons: any;
    public menus: any;
    public modals: any;

    constructor() {
        super({
            intents: [
                "MessageContent",
                "GuildMembers",
                "GuildMessages",
            ],
            partials: [
                Partials.GuildMember,
                Partials.Message,
            ]
        })
    };

    private async loadModules() {

        // Build the path to the modules directory
        const modulesPath = join(process.cwd(), "apps", "core", "src", "modules");

        // Construct the search pattern for all the modules
        const glob = new Glob("{commands,events,interactions}/**/*.ts");

        // Scan & extract all the files from the search pattern
        const files = await Array.fromAsync(glob.scan({ cwd: modulesPath }));

        // DEBUG
        console.log("files scanned:", files);

        // Check if there were no files extracted => Log & exit the process
        if (files.length === 0) {
            ConsoleLogger.notification(LogType.SYSTEM, "No files found within the modules directory.");
            process.exit(0);
        };

        // For logging purposes only: Count how many modules were loaded
        let totalModules = 0;

        await Promise.all(
            files.map(async (f) => {

                // Format the file path (for windows as the OS uses backslashes)
                const formattedPath = f.replaceAll(/\\/g, "/");

                // Build the file path to the indexed extracted file
                const filePath = join(modulesPath, formattedPath);

                // Import the module
                const module = await import(filePath);
                const component = module.default;

                // Check if the component doesn't exist or it is NOT a function
                if (!component || typeof component !== "function") return ConsoleLogger.notification(LogType.WARNING, `Failed to load ${f} as it does not exist or is not the correct constructor.`);

                // Create a new instance of the imported module
                const instance: { execute: () => void } = new component();

                // Check if the instance is missing the execute attribute
                if (typeof instance.execute !== "function") return ConsoleLogger.notification(LogType.WARNING, `${f} is missing the "execute" attribute.`);

                // Determine the category based on the folder path
                const [category, subCategory] = formattedPath.split("/");

                ConsoleLogger.notification(LogType.INFO, `Client found ${files.length} modules --> Cached ${totalModules} modules.`);
            })
        )
    }

    public async StartClient() {

        // Extract the expected token variable from the env file safely
        const { CLIENT_TOKEN } = Bun.env;

        // Check if the variable doesn't exist in the env file or it is misformed
        if (!CLIENT_TOKEN || typeof CLIENT_TOKEN !== "string") {
            ConsoleLogger.notification(LogType.CRITICAL, "Unable to start the client as no Discord Bot Token was provided in the .env file.");
            process.exit(1);
        };

        // Attempt to start the client
        try {
            await this.loadModules();

            // Attempt to login to the discord client
            await this.login(CLIENT_TOKEN);
        } catch (error) {
            console.error("Failed to start the client: ", error);
            process.exit(1);
        }

        ConsoleLogger.notification(LogType.CLIENT, `🌈 Successfully logged into the client: ${this.user?.username}`)
    }
}