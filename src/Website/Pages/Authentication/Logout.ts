// ================================================================= [ Libraries ]
import Page from '../Page';
import Login from './Login';

// ================================================================= [ Authentication - Logout ]
export default class Logout extends Page {

    static base_url = "/logout";
    constructor(data: any) {
        super(data, Logout.base_url)
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {
            if (this.data.server.sessionHandler.isSession(req))
                req.session.destroy((err) => { })
            return res.status(200).redirect(Login.base_url)
        })
    }
}