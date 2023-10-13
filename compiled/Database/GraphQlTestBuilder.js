"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./graphql-scema/schema"));
class GraphQLBuilder {
    data;
    constructor(data) {
        this.data = data;
    }
    build() {
        const app = (0, express_1.default)();
        const port = 4000;
        const builder = new schema_1.default(this.data);
        app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
            schema: builder.schema(),
            graphiql: true
        }));
        app.listen(port, () => this.data.utils.print("GraphiQL Tester is now listening on: " + port, "GraphQL"));
    }
}
exports.default = GraphQLBuilder;
