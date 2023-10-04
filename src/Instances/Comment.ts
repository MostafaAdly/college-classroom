// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';

// ================================================= [ Comment ]
export default class Comment {

    // ============== - Comment INFORMATION - ==============

    public id: string = uuid();
    public user: string;
    public text: string;
    public post: string;
    public date: Date;

    // ============== - Config - ==============

    // ============== - Constructor - ==============
    // constructor()
}
