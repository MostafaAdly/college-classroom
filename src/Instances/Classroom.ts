// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';

// ================================================= [ Classroom ]
export default class Classroom {

    // ============== - CLASSROOM INFORMATION - ==============

    public id: string = uuid();
    public name: string;
    public posts: string[];

    // ============== - CONSTRUCTOR - ==============

    constructor() {
    }
}
