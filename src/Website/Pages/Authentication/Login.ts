// ================================================================= [ Libraries ]
import { Router } from 'express'
import Page from '../Page';

// ================================================================= [ Authentication - Login ]
export default class Login extends Page {

    constructor(data: any) {
        super(data, "/login")
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {
            return this.data.server.next.render(req, res, "/Authentication/Login", {});
        })

    }
}