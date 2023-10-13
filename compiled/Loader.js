"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GraphQlTestBuilder_1 = __importDefault(require("./Database/GraphQlTestBuilder"));
const MongoDB_1 = __importDefault(require("./Database/MongoDB"));
const Utils_1 = __importDefault(require("./Utils"));
const Server_1 = __importDefault(require("./Website/Server"));
class BootLoader {
    data;
    constructor(data) {
        this.data = data;
    }
    load_Server() {
        const server = new Server_1.default(this.data);
        server.load();
        server.load_Middleware();
        server.initialize();
        this.data.server = server;
    }
    load_GraphQl() {
        const graphqlBuilder = new GraphQlTestBuilder_1.default(this.data);
        graphqlBuilder.build();
    }
    async load_Database() {
        const database = new MongoDB_1.default(this.data);
        await database.connect();
    }
    load_utils = () => new Utils_1.default(this.data).initialize();
}
exports.default = BootLoader;
