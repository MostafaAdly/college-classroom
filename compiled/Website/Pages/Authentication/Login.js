"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const Dashboard_1 = __importDefault(require("../Dashboard/Dashboard"));
class Login extends Page_1.default {
    static base_url = "/login";
    constructor(data) {
        super(data, Login.base_url);
        this.run();
    }
    run() {
        this.getRouter().get('/', (req, res) => {
            if (this.data.server.sessionHandler.isSessionLoggedIn(req))
                return res.redirect(Dashboard_1.default.base_url);
            return this.data.server.next.render(req, res, "/Authentication/Login", {});
        });
    }
}
exports.default = Login;
