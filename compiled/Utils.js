"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const date_and_time_1 = __importDefault(require("date-and-time"));
const uuid_1 = require("uuid");
class Global {
    utils = {};
    constructor(data) {
        data.utils = this.utils;
    }
    initialize() {
        this.utils.print = (msg, name = "Global") => console.log(`${name
            ? this.countSpaces("", 3) +
                colors_1.default.cyan("[" + name + "]") +
                this.countSpaces(name, 12)
            : ""}${date_and_time_1.default.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} - ${msg}`);
        this.utils.line = (name) => this.utils.print(`--------- ${colors_1.default.red(name)} ---------`, name);
        this.utils.error = (msg, name) => this.utils.print(colors_1.default.red(msg), name);
        this.utils.createId = (removeSplits = false, repeat = 1) => {
            let id = "";
            for (let i = 0; i < repeat; i++)
                id += (0, uuid_1.v4)().replaceAll("-", removeSplits ? "" : "-");
            return id;
        };
    }
    countSpaces(word = "", amount = 0) {
        let whiteSpaces = "";
        for (let i = 0; i < Math.abs(amount - word.length); i++)
            whiteSpaces += " ";
        return whiteSpaces;
    }
}
exports.default = Global;
