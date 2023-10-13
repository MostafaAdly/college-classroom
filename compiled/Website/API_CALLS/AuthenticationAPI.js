"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Pages/Page"));
const User_1 = __importDefault(require("../../Instances/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthenticationAPI extends Page_1.default {
    salt = 10;
    constructor(data, base_url) {
        super(data, base_url || "/api/v1/auth");
        this.run();
    }
    run() {
        this.getRouter().post('/', async (req, res) => {
            const { login, register } = req.body;
            let saveInSession = false;
            let response = { error: `Could not handle authentication.` };
            let user = null;
            if (login) {
                user = await this.isCredentialsValid(true, login.username, login.email, login.password);
                saveInSession = user != undefined;
                response = saveInSession ? { success: `Credentials successfully logged in`, login } : { error: (`These credentials are not correct.`), user };
            }
            else if (register) {
                saveInSession = !(await this.isCredentialsValid(false, register.username, register.email, register.password));
                if (saveInSession)
                    user = await this.registerUser(register.username, register.email, register.password);
                response = saveInSession ? { success: `Credentials successfully registered`, register } : { error: `These credentials are not valid`, saveInSession };
            }
            if (saveInSession)
                this.saveUserInSession(req, user);
            return res.send(response);
        });
    }
    saveUserInSession(req, user) {
        if (!req || !user)
            return;
        req.session.user = { id: user.id, email: user.credentials?.email };
    }
    async isCredentialsValid(loginMode, username, email, password) {
        email = ("" + email).toLowerCase();
        if (loginMode) {
            const user = await (User_1.default.schema().findOne({ 'credentials.email': email }));
            return user?.credentials?.password && await bcryptjs_1.default.compare(password, user?.credentials?.password) ? user : undefined;
        }
        else {
            return (await User_1.default.schema().findOne({ $or: [{ username }, { 'credentials.email': email }] }).collation({ locale: "en", strength: 2 }).exec());
        }
    }
    async registerUser(username, email, password) {
        email = ("" + email).toLowerCase();
        const hashedPassword = await bcryptjs_1.default.hash(password, this.salt);
        const user = new User_1.default({ username, credentials: { email, password: hashedPassword } });
        await new (User_1.default.schema())(user).save();
        return user;
    }
}
exports.default = AuthenticationAPI;
