// ================================================================= [ Libraries ]
import Page from "../Pages/Page";
import type { Router } from "express";

// ================================================================= [ AuthenticationAPI ]
export default class AuthenticationAPI extends Page {
    constructor(data: any, base_url?: string | undefined) {
        super(data, base_url || "/api/v1/auth")
        this.run()
    }
    private run() {
        this.getRouter().get('/login', (req, res) => {
            return res.send({ username: "Mostafa", password: "this_is_password", age: 21 })
        })
    }
}