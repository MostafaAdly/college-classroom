// ================================================================= [ Libraries ]
import { Router } from 'express'
import Page from '../Page';
import Dashboard from '../Dashboard/Dashboard';

// ================================================================= [ Authentication - Login ]
export default class Login extends Page {

    static base_url = "/login";
    constructor(data: any) {
        super(data, Login.base_url)
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {

            if (this.data.server.sessionHandler.isSessionLoggedIn(req))
                return res.redirect(Dashboard.base_url)

            return this.data.server.next.render(req, res, "/Authentication/Login", {});
        })
    }
}