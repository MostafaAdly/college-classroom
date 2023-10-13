"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Page {
    data;
    router = (0, express_1.Router)();
    base_url;
    constructor(data, base_url) {
        this.data = data;
        this.base_url = base_url;
    }
    setRouter = (base_url) => this.base_url = base_url;
    getRouter = () => this.router;
    print = (msg, type = "Global") => this.data.utils.print(msg, type);
}
exports.default = Page;
