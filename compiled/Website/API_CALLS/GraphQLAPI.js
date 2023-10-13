"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = require("express-graphql");
const Page_1 = __importDefault(require("../Pages/Page"));
const schema_1 = __importDefault(require("../../Database/graphql-scema/schema"));
class AuthenticationAPI extends Page_1.default {
    constructor(data, base_url) {
        super(data, base_url || "/api/v1/graphql");
        this.run();
    }
    run() {
        this.getRouter().use('/', (0, express_graphql_1.graphqlHTTP)({ schema: new schema_1.default(this.data).schema(), graphiql: true }));
    }
}
exports.default = AuthenticationAPI;
