"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = __importStar(require("mongoose"));
const Role_1 = require("./Role");
class User {
    id = (0, uuid_1.v4)();
    username;
    role = Role_1.Role.Student;
    credentials;
    info;
    classes;
    comments;
    constructor(config) {
        if (config.id)
            this.id = config.id;
        this.username = config.username;
        if (config.role)
            this.role = config.role;
        this.credentials = config.credentials;
        this.info = config.info || {};
        this.classes = config.classes || [];
        this.comments = config.comments || [];
    }
    static model;
    static schema = () => {
        if (!this.model)
            this.model = mongoose_1.default.model("users", new mongoose_1.Schema({
                id: String,
                role: Number,
                username: { type: String, unique: true },
                credentials: { type: Object },
                classes: Array,
                createdAt: Date,
            }));
        return this.model;
    };
}
exports.default = User;
