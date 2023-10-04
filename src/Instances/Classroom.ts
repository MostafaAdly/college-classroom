// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';
import mongoose, { Schema } from 'mongoose'


// ================================================= [ Classroom ]
export default class Classroom {

    // ============== - CLASSROOM INFORMATION - ==============

    public id: string = uuid();
    public name: string;
    public posts: string[];
    public teachers: string[];
    public students: string[];

    // ============== - CONSTRUCTOR - ==============

    // ============== - MODEL - ==============
    private static model: any;
    static schema = () => {
        if (!this.model) this.model = mongoose.model("classrooms", new Schema({
            id: String,
            name: String,
            teachers: [String],
            students: [String],
            posts: [String],
            createdAt: Date,
        }))
        return this.model;
    }
}
