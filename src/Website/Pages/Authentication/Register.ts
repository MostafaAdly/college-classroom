// ================================================================= [ Libraries ]
import { Router } from 'express'
import Page from '../Page';
import Dashboard from '../Dashboard/Dashboard';

// ================================================================= [ Authentication - Register ]
export default class Register extends Page {

    static base_url = "/register"
    constructor(data: any) {
        super(data, Register.base_url)
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {

            if (this.data.server.sessionHandler.isSessionLoggedIn(req))
                return res.redirect(Dashboard.base_url)

            return this.data.server.next.render(req, res, "/Authentication/Register", {});
        })
    }
}