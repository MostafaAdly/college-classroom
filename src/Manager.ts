// ================================================ [ Libraries ]
import { config as dotenv_config } from "dotenv";
import BootLoader from "./Loader";

// ================================================ [ Manager ]
export default class Manager {
    public data: any = {}
    constructor() {
        dotenv_config()
    }
    initialize() {
        this.startLoader()
    }
    startLoader() {
        (async () => {
            const _loader = new BootLoader(this.data);
            // Initialize utils
            _loader.load_utils();

            // Connect to the Database
            _loader.load_Database();

            // Initialize GraphQL
            _loader.load_GraphQl();

            // Initialize the Server
            // _loader.load_Server();
        })();
    }
}


// Application Initializer
new Manager().initialize();