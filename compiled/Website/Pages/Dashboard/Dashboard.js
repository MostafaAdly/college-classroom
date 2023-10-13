"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class Dashboard extends Page_1.default {
    static base_url = "/dashboard";
    constructor(data) {
        super(data, Dashboard.base_url);
        this.run();
    }
    run() {
        this.getRouter().get('/', (req, res) => {
            const session = req.session;
            const user = session.user;
            return this.data.server.next.render(req, res, "/HomePage/Dashboard", user);
        });
    }
}
exports.default = Dashboard;
