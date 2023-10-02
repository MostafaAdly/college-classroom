// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';

// ================================================= [ Post ]
export default class Post {

    // ============== - Post INFORMATION - ==============

    public id: string = uuid();
    public user: string;
    public comments: string[];
    
    // ============== - CONSTRUCTOR - ==============

    constructor() {}
}
