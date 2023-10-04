// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';
import mongoose, { Schema } from 'mongoose';

// ================================================= [ Comment ]
export default class Comment {

    // ============== - Comment INFORMATION - ==============

    public id: string = uuid();
    public user: string;
    public post: string;

    // ============== - Config - ==============
    static config: {
        id: string,
        user: string,
        post: string
    }

    // ============== - Constructor - ==============
    // constructor()
}
