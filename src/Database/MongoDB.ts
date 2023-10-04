// ================================================= [ Libraries ]
import mongoose from "mongoose";
import Classroom from "../Instances/Classroom";
import Post from "../Instances/Post";
import User from "../Instances/User";
import { Role } from "../Instances/Role";

// ================================================= [ MongoDB ]
export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    async connect() {
        try {
            mongoose.connect(process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/").then(async () => {
                this.data.utils.print("Database [ MongoDB ] connected.", "Database");
            }).catch((err) => {
                console.log(err);
                process.exit(1);
            })
        } catch (error) {
            console.log(error)
            process.exit(1);
        }
    }
    private forTestingPurposesONLY() {

        /*
         CURRENTLY UNUSED
         This is for testing purposes only
        */

        let cr1Id = this.data.utils.createId()
        let cr2Id = this.data.utils.createId()
        let cr3Id = this.data.utils.createId()
        let pId = this.data.utils.createId();

        let user1Id = this.data.utils.createId();
        const user = new (User.schema())({
            id: user1Id,
            username: "MostafaAdly",
            role: Role.Admin,
            credentials: {
                email: "mostafaadlyamar@gmail.com",
                password: "Mostafa011"
            },
            classes: [cr1Id, cr2Id, cr3Id],
            createdAt: new Date(),
        });
        const user2Id = this.data.utils.createId();
        const user2 = new (User.schema())({
            id: user2Id,
            username: "Hassan Anwar",
            role: Role.Student,
            credentials: {
                email: "hassan_anwar@gmail.com",
                password: "hassananwar"
            },
            classes: [cr1Id, cr2Id, cr3Id],
            createdAt: new Date(),
        });
        const user3Id = this.data.utils.createId();
        const user3 = new (User.schema())({
            id: user3Id,
            username: "Efad Wael",
            role: Role.Teacher,
            credentials: {
                email: "efadwael@gmail.com",
                password: "efadwael"
            },
            classes: [cr1Id, cr2Id, cr3Id],
            createdAt: new Date(),
        });
        const post = new (Post.schema())({
            id: pId,
            user: user1Id,
            text: "A classroom for a college, a better future.",
            class: cr1Id,
            comments: [{
                id: this.data.utils.createId(),
                user: user1Id,
                text: "This is the first comment.",
                post: pId,
                date: new Date(),
            }],
            date: new Date(),
        });
        const classroom = new (Classroom.schema())({
            id: cr1Id,
            name: "Mathematics",
            students: [user2Id, user3Id],
            teachers: [user1Id],
            posts: [pId],
            createdAt: new Date(),
        });
        const classroom2 = new (Classroom.schema())({
            id: cr2Id,
            name: "English",
            students: [user2Id],
            teachers: [user1Id, user3Id],
            posts: [],
            createdAt: new Date(),
        });
        const classroom3 = new (Classroom.schema())({
            id: cr3Id,
            name: "Physics",
            students: [user1Id, user2Id, user3Id],
            teachers: [],
            posts: [],
            createdAt: new Date(),
        });

        // user.save();
        // user2.save();
        // user3.save();

        // classroom.save();
        // classroom2.save();
        // classroom3.save();

        // post.save();
    }
    disconnect = () => this.data.db.close();
} 