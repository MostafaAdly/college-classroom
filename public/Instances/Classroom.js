"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ================================================= [Libraries]
const uuid_1 = require("uuid");
// ================================================= [ Classroom ]
class Classroom {
    // ============== - CONSTRUCTOR - ==============
    constructor() {
        // ============== - CLASSROOM INFORMATION - ==============
        this.id = (0, uuid_1.v4)();
    }
}
exports.default = Classroom;
