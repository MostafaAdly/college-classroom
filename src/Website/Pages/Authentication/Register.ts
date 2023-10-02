// ================================================================= [ Libraries ]
import { Router } from 'express'
import Page from '../Page';

// ================================================================= [ Authentication - Register ]
export default class Register extends Page {

    constructor(data: any) {
        super(data, "/register")
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {
            return this.data.server.next.render(req, res, "/Authentication/Register", {});
        })
    }
}