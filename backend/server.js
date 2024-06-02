import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})
import authRouter from './routes/auth.router.js'
import connectDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.router.js'
import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})



const app = express()



app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)





connectDB()
    .then(
        app.listen(process.env.PORT, () => {
            console.log("Server is running");
        })
    )