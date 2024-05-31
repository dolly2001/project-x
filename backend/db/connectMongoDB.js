import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path : './env'
})

const connectDB = async () => {

    try {

        const DBconnected = await mongoose.connect(process.env.DB_URL)
        console.log(`DataBase Connected successfully`,
            DBconnected.connection.host,
            DBconnected.connection.name
        )

        
    } catch (error) {
        console.log("Error occured in DB file Error --> ", error);
        process.exit(1)
    } 

}

export default connectDB