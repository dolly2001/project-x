import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})
import notificationRouter from './routes/notification.router.js'
import authRouter from './routes/auth.router.js'
import postRouter from './routes/post.router.js'
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
app.use("/api/post", postRouter)
app.use("/api/notifications", notificationRouter)




connectDB()
    .then(
        app.listen(process.env.PORT, () => {
            console.log("Server is running");
        })
    )