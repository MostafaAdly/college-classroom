"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Loader_1 = __importDefault(require("./Loader"));
class Manager {
    data = {};
    constructor() {
        (0, dotenv_1.config)();
    }
    initialize() {
        this.startLoader();
    }
    startLoader() {
        (async () => {
            const _loader = new Loader_1.default(this.data);
            _loader.load_utils();
            _loader.load_Database();
            _loader.load_Server();
        })();
    }
}
exports.default = Manager;
new Manager().initialize();
