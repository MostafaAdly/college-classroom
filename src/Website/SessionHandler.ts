// ================================================================= [ Libraries ]

import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";

// ================================================================= [ Session Handler ]

export default class SessionHandler {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public runMiddleware(req: any, res: any, next: any) {
        if (req.method.toLowerCase() == 'get' && !this.isNextJSURL(req.url) && !this.isSessionRegisteredByUser(req) && !this.isAuthURL(req.url)) {
            return res.redirect(Login.base_url);
        }
        next();
    }

    public isAuthURL(url: string): boolean {
        return url != null && [Login.base_url, Register.base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0
    }

    public isNextJSURL(url: string): boolean {
        return url != null && ['/_next', '/docs/'].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0

    }
    public isSession(req: any): boolean {
        return req.session != null;
    }

    public isSessionRegisteredByUser(req: any): boolean {
        return this.isSession(req) && req.session.user != null;
    }

    public isSessionLoggedIn(req: any): boolean {
        return this.isSession(req) && req.session.user != null;
    }
}