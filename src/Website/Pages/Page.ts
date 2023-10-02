// ================================================================= [ Libraries ]
import { Router } from 'express'

// ================================================================= [ Authentication - Login ]
export default class Page {
    public data: any;
    private router: Router = Router();
    public base_url: string;
    constructor(data: any, base_url: string) {
        this.data = data;
        this.base_url = base_url;
    }

    setRouter = (base_url: string) => this.base_url = base_url;
    getRouter = () => this.router;
    print = (msg: string, type: string | undefined = "Global") => this.data.utils.print(msg, type)
}