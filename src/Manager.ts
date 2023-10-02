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
        const _loader = new BootLoader(this.data);
        // Initialize utils
        _loader.load_utils();

        // Initialize the Server
        _loader.load_server();
    }
}


// Application Initializer
new Manager().initialize();