// ================================================= [ Libraries ]
import { MongoClient, ObjectId } from "mongodb";
// ================================================= [ MongoDB ]
export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    async connect() {
        try {
            const client = new MongoClient(process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/");
            const databaseName = process.env.MONGODB_DATABASE;
            const db = client.db(databaseName);
            var coll = db.collection("users");
            var classroomId = this.data.utils.createId()
            const user = {
                id: this.data.utils.createId(),
                name: "MostafaAdly",
                email: "MostafaAdlyAmar@gmail.com",
                classes: [classroomId]
            }
            const classroom = {
                id: classroomId,
                name: "English 101",
                teachers: [],
                students: [user.id],
                posts: []
            }
            // console.log(await (db.collection("users").find({ classes: "6d06590b-ddd7-4ba3-adcf-c558785f9c95" })).toArray())
            this.data.database = db
        } catch (error) {
            console.log(error)
            process.exit(1);
        }
    }
    disconnect = () => this.data.db.close();
} 