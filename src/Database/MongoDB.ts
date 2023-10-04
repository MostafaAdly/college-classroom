// ================================================= [ Libraries ]

import mongoose from "mongoose";
import User from "../Instances/User";

// ================================================= [ MongoDB ]
export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    async connect() {
        try {
            mongoose.connect(process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/").then(async () => {
                this.data.utils.print("Database [ MongoDB ] connected.", "Database")

                // console.log(await (User.schema().findOne({ 'credentials.email': "mostafaadlyamar@gmail.com", "credentials.password": "Mostafa011" })))

            }).catch((err) => {
                console.log(err);
                process.exit(1);
            })
        } catch (error) {
            console.log(error)
            process.exit(1);
        }
    }
    disconnect = () => this.data.db.close();
} 