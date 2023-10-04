// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';
import mongoose, { Schema } from 'mongoose';
import Comment from './Comment';

// ================================================= [ Post ]
export default class Post {

    // ============== - Post INFORMATION - ==============

    public id: string = uuid();
    public user: string;
    public text: string;
    public comments: string[];
    public date: Date;

    // ============== - CONSTRUCTOR - ==============

    // ============== - MODEL - ==============
    private static model: any;
    static schema = () => {
        if (!this.model) this.model = mongoose.model("posts", new Schema({
            id: String,
            user: String,
            text: String,
            class: String,
            comments: [
                {
                    id: String,
                    user: String,
                    post: String,
                    text: String,
                    date: Date,
                }
            ],
            date: Date,
        }));
        return this.model
    }
}
