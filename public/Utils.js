"use strict";
// ========================================================= [ Libraries ]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors = __importStar(require("colors"));
const dateformat_1 = __importDefault(require("dateformat"));
// ========================================================= [ Global ]
class Global {
    constructor(data) {
        data.utils = this.utils;
        data.utils.colors = colors;
    }
    initialize() {
        this.utils.print = (msg, name = "Global") => console.log(`${name
            ? this.countSpaces("", 3) +
                this.utils.colors.cyan("[" + name + "]") +
                this.countSpaces(name, 12)
            : ""}${(0, dateformat_1.default)(Date.now())} - ${msg}`);
        this.utils.line = (name) => this.utils.print(`--------- ${this.utils.colors.red(name)} ---------`, name);
        this.utils.error = (msg, name) => this.utils.print(this.utils.colors.red(msg), name);
    }
    countSpaces(word = "", amount = 0) {
        let whiteSpaces = "";
        for (let i = 0; i < Math.abs(amount - word.length); i++)
            whiteSpaces += " ";
        return whiteSpaces;
    }
}
exports.default = Global;
