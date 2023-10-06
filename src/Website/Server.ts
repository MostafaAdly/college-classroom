// ================================================ [ Libraries ]
import express, { Express } from 'express';
import Page from './Pages/Page';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import next from 'next'
import { NextServer } from 'next/dist/server/next';
import WildCard from './Pages/WildCards/NextWildCard';
import sessions from 'express-session'
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import AuthenticationAPI from './API_CALLS/AuthenticationAPI';
import GraphQLAPI from './API_CALLS/GraphQLAPI'
import Dashboard from './Pages/Dashboard/Dashboard';
import SessionHandler from './SessionHandler';
import Logout from './Pages/Authentication/Logout';
import path from 'path';

// ================================================ [ Server ]
export default class Server {
    // ============== - PRIVATE VARIABLES - ==============
    private data: any;
    private development: boolean = process.env.ENVIROMENT !== "production";

    // ============== - PUBLIC VARIABLES - ==============
    public sessionHandler: SessionHandler;
    public port: number = 3000;
    public app: Express = express();
    public next: NextServer = next({
        dev: this.development
    });

    constructor(data: any) {
        this.data = data;
        this.data.server = this;
    }
    load() {
        this.port = parseInt(process.env.SERVER_PORT || '' + this.port);
        this.sessionHandler = new SessionHandler(this.data);
    }
    load_Middleware() {
        // For parsing the responses.
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json());
        // For parsing cookies
        this.app.use(cookieParser());
        // Making accessing static files easier
        this.app.use("../../pages", express.static(__dirname));

        // For session handling.
        this.app.use(sessions({
            secret: this.data.utils.createId(true, 3),
            saveUninitialized: true,
            cookie: { maxAge: 1000 * 60 * 60 * 24 },
            resave: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_CONNECTION
            })
        }));
        this.app.use((req, res, next) => this.sessionHandler.runMiddleware(req, res, next))

    }
    initialize() {

        this.next.prepare().then(() => {

            // Loading all available and working API for the upcoming loaded pages.
            this.load_APIs();

            // Loading all available pages for  [ Development / Production ]
            this.load_Pages();

            // Starting the server listener...
            this.listen();

        }).catch((err: any) => {
            console.error(err)
        })
    }
    load_Pages() {

        // Current Running Pages
        const pages: Page[] = [


            // These pages can be edited.
            new Dashboard(this.data),

            // These pages can be edited.
            new Login(this.data),
            new Register(this.data),
            new Logout(this.data),

            // Do not remove this.
            new WildCard(this.data),

        ];

        for (let page of pages) {
            this.app.use(page.base_url, page.getRouter());
        }
    }
    load_APIs() {

        // Current Running APIs for the available pages.
        const apis: Page[] = [

            // Verification API for the Auth pages
            new AuthenticationAPI(this.data, "/api/v1/auth"),

            // Loading GraphQL API
            new GraphQLAPI(this.data, "/api/v1/graphql"),
        ];

        for (let api of apis) {
            this.app.use(api.base_url, api.getRouter());
        }
    }
    listen() {
        this.app.listen(this.port, () => {
            this.data.utils.print(`Server started listening on ${this.port}`);
            this.data.utils.print(`Project: http://localhost:${this.port}/login`);
        })
    }
}