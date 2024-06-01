import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})
import authRouter from './routes/auth.router.js'
import connectDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'



const app = express()



app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use("/api/auth", authRouter)





connectDB()
    .then(
        app.listen(process.env.PORT, () => {
            console.log("Server is running");
        })
    )