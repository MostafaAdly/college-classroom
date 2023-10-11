// ================================================================= [ Libraries ]
import Page from "../Pages/Page";
import User from '../../Instances/User'
import bcryptjs from 'bcryptjs'

// ================================================================= [ AuthenticationAPI ]
export default class AuthenticationAPI extends Page {
    private salt: number = 10;
    constructor(data: any, base_url: string | undefined) {
        super(data, base_url || "/api/v1/auth")
        this.run()
    }
    private run() {
        this.getRouter().post('/', async (req, res) => {
            const { login, register } = req.body;
            let saveInSession = false;
            let response: any = { error: `Could not handle authentication.` }
            let user = null;
            if (login) {
                user = await this.isCredentialsValid(true, login.username, login.email, login.password);
                saveInSession = user != undefined;
                response = saveInSession ? { success: `Credentials successfully logged in`, login } : { error: (`These credentials are not correct.`), user }
            } else if (register) {
                saveInSession = !(await this.isCredentialsValid(false, register.username, register.email, register.password));
                if (saveInSession)
                    user = await this.registerUser(register.username, register.email, register.password)
                response = saveInSession ? { success: `Credentials successfully registered`, register } : { error: `These credentials are not valid`, saveInSession };
            }
            if (saveInSession) // validates both login and register
                this.saveUserInSession(req, user)
            return res.send(response)
        })
    }

    private saveUserInSession(req: any, user: any) {
        if (!req || !user) return;
        req.session.user = { id: user.id, email: user.credentials?.email }
    }

    private async isCredentialsValid(loginMode: boolean, username: string, email: string, password: string): Promise<object> {
        email = ("" + email).toLowerCase()
        if (loginMode) {
            // Login : check if credentials are valid.
            const user = await (User.schema().findOne({ 'credentials.email': email }))
            return user?.credentials?.password && await bcryptjs.compare(password, user?.credentials?.password) ? user : undefined;
        } else {
            // Register : check if credentials are used.
            return (await User.schema().findOne({ $or: [{ username }, { 'credentials.email': email }] }).collation({ locale: "en", strength: 2 }).exec());
        }
    }

    private async registerUser(username: string, email: string, password: string): Promise<object> {
        email = ("" + email).toLowerCase()
        const hashedPassword = await bcryptjs.hash(password, this.salt);
        const user = new User({ username, credentials: { email, password: hashedPassword } });
        await new (User.schema())(user).save();
        return user
    }

}