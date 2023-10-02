"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ [ Libraries ]
const express_1 = __importDefault(require("express"));
// ================================================ [ Server ]
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3000;
        this.load();
        this.loadMiddleware();
        this.initialize();
    }
    load() {
        this.port = parseInt(process.env.SERVER_PORT || '' + this.port);
    }
    loadMiddleware() {
    }
    initialize() {
    }
    listen() {
    }
}
exports.default = Server;
