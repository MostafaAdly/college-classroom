// ====================================================== [ Libraries ]

import GraphQLBuilder from "./Database/GraphQlTestBuilder";
import MongoDB from "./Database/MongoDB";
import Global from "./Utils";
import Server from "./Website/Server";


// ====================================================== [ Boot Loader ]
export default class BootLoader {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    // =================== - Loading Methods - ===================
    load_Server() {
        const server = new Server(this.data);
        server.load();
        server.load_Middleware();
        server.initialize();
        this.data.server = server;
    }
    load_GraphQl() {
        const graphqlBuilder = new GraphQLBuilder(this.data);
        graphqlBuilder.build();
    }
    async load_Database() {
        const database = new MongoDB(this.data);
        await database.connect();
    }
    load_utils = () => new Global(this.data).initialize();
}