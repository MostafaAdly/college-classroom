// ================================================================= [ Libraries ]
import Page from '../Page';

// ================================================================= [ Authentication - Dashboard ]
export default class Dashboard extends Page {

    static base_url = "/dashboard";
    constructor(data: any) {
        super(data, Dashboard.base_url)
        this.run();
    }
    private run() {
        this.getRouter().get('/', (req, res) => {
            const session = req.session as any;
            const user = session.user
            return this.data.server.next.render(req, res, "/HomePage/Dashboard", user);

        })

    }
}