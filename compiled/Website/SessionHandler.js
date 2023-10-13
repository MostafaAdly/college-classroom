"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const Register_1 = __importDefault(require("./Pages/Authentication/Register"));
class SessionHandler {
    data;
    constructor(data) {
        this.data = data;
    }
    runMiddleware(req, res, next) {
        if (req.method.toLowerCase() == 'get' && !this.isNextJSURL(req.url) && !this.isSessionRegisteredByUser(req) && !this.isAuthURL(req.url)) {
            return res.redirect(Login_1.default.base_url);
        }
        next();
    }
    isAuthURL(url) {
        return url != null && [Login_1.default.base_url, Register_1.default.base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0;
    }
    isNextJSURL(url) {
        return url != null && ['/_next', '/docs/'].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0;
    }
    isSession(req) {
        return req.session != null;
    }
    isSessionRegisteredByUser(req) {
        return this.isSession(req) && req.session.user != null;
    }
    isSessionLoggedIn(req) {
        return this.isSession(req) && req.session.user != null;
    }
}
exports.default = SessionHandler;
