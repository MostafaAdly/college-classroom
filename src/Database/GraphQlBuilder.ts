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

        const builder = new SchemaBuilder(this.data);
        const app = express();
        const port = 4001;

        app.use('/graphql', graphqlHTTP({
            schema: builder.schema(),
            graphiql: true
        }))

        app.listen(port, () => console.log("app is now listening on " + port))
    }
}