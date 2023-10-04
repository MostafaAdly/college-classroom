// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';
import mongoose, { Schema } from 'mongoose';
import { Role } from './Role';

// ================================================= [ Classroom ]
export default class User {

    // ============== - User INFORMATION - ==============

    public id: string = uuid();
    public username: string;
    public role: Role = Role.Student;
    public credentials: { email: string, password: string }
    public info: object;
    public classes: string[];
    public comments: string[];

    // ============== - CONSTRUCTOR - ==============
    constructor(config: any) {
        if (config.id)
            this.id = config.id
        this.username = config.username
        if (config.role)
            this.role = config.role
        this.credentials = config.credentials
        this.info = config.info || {}
        this.classes = config.classes || []
        this.comments = config.comments || []
    }

    // ============== - MODEL - ==============
    private static model: any;
    static schema = () => {
        if (!this.model) this.model = mongoose.model("users", new Schema({
            id: String,
            role: Number,
            username: { type: String, unique: true },
            credentials: { type: Object },
            classes: Array,
            createdAt: Date,
        }));
        return this.model;
    }
}