// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';

// ================================================= [ Comment ]
export default class Comment {

    // ============== - Post INFORMATION - ==============

    public id: string = uuid();
    public user: string;
    public post: string;
    
    // ============== - CONSTRUCTOR - ==============

    constructor() {

    }
}
