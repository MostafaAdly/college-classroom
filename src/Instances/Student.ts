// ================================================= [Libraries]
import { v4 as uuid } from 'uuid';
import Classroom from './Classroom'

// ================================================= [ Classroom ]
export default class Student {

    // ============== - STUDENT INFORMATION - ==============

    public id: string = uuid();
    public name: string;
    public credentials: object;
    public info: object;
    public classes: string[];
    public comments: string[];
    
    // ============== - CONSTRUCTOR - ==============
    constructor() {
    }
}