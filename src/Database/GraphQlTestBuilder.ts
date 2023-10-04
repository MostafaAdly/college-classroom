// ============================================================== [ Libraries ]
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import SchemaBuilder from './graphql-scema/schema'

// ============================================================== [GraphQL]

export default class GraphQLBuilder {

    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    build() {

        const app = express();
        const port = 4000;

        const builder = new SchemaBuilder(this.data);
        app.use('/graphql', graphqlHTTP({
            schema: builder.schema(),
            graphiql: true
        }))

        app.listen(port, () => this.data.utils.print("GraphiQL Tester is now listening on: " + port, "GraphQL"))
    }
}