"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const Login_1 = __importDefault(require("./Login"));
class Logout extends Page_1.default {
    static base_url = "/logout";
    constructor(data) {
        super(data, Logout.base_url);
        this.run();
    }
    run() {
        this.getRouter().get('/', (req, res) => {
            if (this.data.server.sessionHandler.isSession(req))
                req.session.destroy((err) => { });
            return res.status(200).redirect(Login_1.default.base_url);
        });
    }
}
exports.default = Logout;
