"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const Register_1 = __importDefault(require("./Pages/Authentication/Register"));
const next_1 = __importDefault(require("next"));
const NextWildCard_1 = __importDefault(
    require("./Pages/WildCards/NextWildCard")
);
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AuthenticationAPI_1 = __importDefault(
    require("./API_CALLS/AuthenticationAPI")
);
const GraphQLAPI_1 = __importDefault(require("./API_CALLS/GraphQLAPI"));
const Dashboard_1 = __importDefault(require("./Pages/Dashboard/Dashboard"));
const SessionHandler_1 = __importDefault(require("./SessionHandler"));
const Logout_1 = __importDefault(require("./Pages/Authentication/Logout"));
class Server {
    data;
    development = process.env.ENVIROMENT !== "production";
    sessionHandler;
    port = 3000;
    app = (0, express_1.default)();
    next = (0, next_1.default)({
        dev: this.development,
    });
    constructor(data) {
        this.data = data;
        this.data.server = this;
        this.data.utils.print(
            "Deploying in " +
                (this.development ? "DEVELOPMENT" : "PRODUCTION")["green"] +
                " mode."
        );
    }
    load() {
        this.port = parseInt(process.env.SERVER_PORT || "" + this.port);
        this.sessionHandler = new SessionHandler_1.default(this.data);
    }
    load_Middleware() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use("../../pages", express_1.default.static(__dirname));
        this.app.use(
            (0, express_session_1.default)({
                secret: this.data.utils.createId(true, 3),
                saveUninitialized: true,
                cookie: { maxAge: 1000 * 60 * 60 * 24 },
                resave: false,
                store: connect_mongo_1.default.create({
                    mongoUrl: process.env.MONGODB_CONNECTION,
                }),
            })
        );
        this.app.use((req, res, next) =>
            this.sessionHandler.runMiddleware(req, res, next)
        );
    }
    initialize() {
        this.next
            .prepare()
            .then(() => {
                this.load_APIs();
                this.load_Pages();
                this.listen();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    load_Pages() {
        const pages = [
            new Dashboard_1.default(this.data),
            new Login_1.default(this.data),
            new Register_1.default(this.data),
            new Logout_1.default(this.data),
            new NextWildCard_1.default(this.data),
        ];
        for (let page of pages) {
            this.app.use(page.base_url, page.getRouter());
        }
    }
    load_APIs() {
        const apis = [
            new AuthenticationAPI_1.default(this.data, "/api/v1/auth"),
            new GraphQLAPI_1.default(this.data, "/api/v1/graphql"),
        ];
        for (let api of apis) {
            this.app.use(api.base_url, api.getRouter());
        }
    }
    listen() {
        this.app.listen(this.port, () => {
            this.data.utils.print(`Server started listening on ${this.port}`);
            this.data.utils.print(
                `Project: http://localhost:${this.port}/login`
            );
        });
    }
}
exports.default = Server;
