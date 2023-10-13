"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Comment {
    id = (0, uuid_1.v4)();
    user;
    text;
    post;
    date;
}
exports.default = Comment;
