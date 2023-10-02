// ================================================================= [ Libraries ]
import { Router } from 'express'
import Page from '../Page';

// ================================================================= [ Authentication - Login ]
export default class WildCard extends Page {
    // ================ - PRIVATE VARIABLES - ================
    constructor(data: any) {
        super(data, "")
        this.run();
    }
    private run() {
        const handler = this.data.server.next.getRequestHandler();
        this.getRouter().get('*', (req, res) => handler(req, res))
    }
}