// ================================================================= [ Libraries ]
import { graphqlHTTP } from "express-graphql";
import Page from "../Pages/Page";
import SchemaBuilder from "../../Database/graphql-scema/schema";

// ================================================================= [ AuthenticationAPI ]
export default class AuthenticationAPI extends Page {
    constructor(data: any, base_url?: string | undefined) {
        super(data, base_url || "/api/v1/graphql")
        this.run()
    }
    private run() {
        this.getRouter().use('/', graphqlHTTP({ schema: new SchemaBuilder(this.data).schema(), graphiql: true }))
    }
}