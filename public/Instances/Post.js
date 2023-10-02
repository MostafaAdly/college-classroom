"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ================================================= [Libraries]
const uuid_1 = require("uuid");
// ================================================= [ Post ]
class Post {
    // ============== - CONSTRUCTOR - ==============
    constructor() {
        // ============== - Post INFORMATION - ==============
        this.id = (0, uuid_1.v4)();
    }
}
exports.default = Post;
