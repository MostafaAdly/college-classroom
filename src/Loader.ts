// ====================================================== [ Libraries ]

import Global from "./Utils";
import Server from "./Website/Server";


// ====================================================== [ Boot Loader ]
export default class BootLoader {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    // =================== - Loading Methods - ===================
    load_server() {
        const server = new Server(this.data);
        server.load();
        server.load_Middleware();
        server.initialize();
        this.data.server = server;
    }
    load_utils = () => new Global(this.data).initialize();
}