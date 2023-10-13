"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class WildCard extends Page_1.default {
    constructor(data) {
        super(data, "");
        this.run();
    }
    run() {
        const handler = this.data.server.next.getRequestHandler();
        this.getRouter().get('*', (req, res) => handler(req, res));
    }
}
exports.default = WildCard;
