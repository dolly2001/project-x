import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {

    try {

        // 1. Get Credentials
        const { name, username, email, password } = req.body;

        // 2. Validate provided data
        if (!name || !username || !email || !password) {
            res.status(404).json({
                message: "All fields are required",
                success: false
            })
        }

        // 3. Check if user already exists 
        const userAlreadyExist = await User.findOne({ email })
        if (userAlreadyExist) {
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        // 4. check if username already exists
        const usernameAlreadyExist = await User.findOne({ username })
        if (usernameAlreadyExist) {
            return res.status(400).json({
                message: "Username not available",
                success: false
            })
        }

        //5. hash password
        const hashPassword = await bcrypt.hash(password, 12)

        // 6. assign data to a variable
        const newUser = new User({
            name,
            username,
            email,
            password: hashPassword
        })


        // 7. Generate Token and set cookie
        if (newUser) {
            // 7.1 generate token and set cookie function
            generateTokenSetCookie(newUser._id, res)
            // 7.2 Save user into database NoSql
            await newUser.save()

            res.status(201).json({
                message: "Account created Successfully",
                // _id : newUser._id,
                // name : newUser.name,
                // username : newUser.username,
                // email : newUser.email,
                // followers : newUser.followers,
                // following : newUser.following,
                // profileImg : newUser.profileImg,
                // coverImg : newUser.coverImg,
                newUser
            })

        } else {

            res.status(400).json({
                error: "Invalid user data"
            })

        }

    } catch (error) {
        console.log("Error --->", error);
    }

}















export const login = async (req, res) => {

    try {

        // 1. Get Credentials
        const { email, password } = req.body

        // 2. Validation
        if (!email || !password) {
            return res.status(404).json({
                message: "Please fill the required fiels",
                success: false
            })
        }

        // 3. find user
        const user = await User.findOne({ email })

        // 4. Check if user is exist or not
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // 5. Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password",
                success: false
            })
        }

        // 6. check cookie
        generateTokenSetCookie(user._id, res)

        // 7. return your response
        res.status(200).json({
            user
        })


    } catch (error) {
        console.log("Error in login---> ", error);
    }

}












export const logout = async (req, res) => {

    try {

        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({
            message : "Logout Successfully",
            success : true
        })
        
    } catch (error) {
        console.log("Error during Logout--> ", error);
    }

}










export const myProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user);
        
    } catch (error) {

        console.log("Error in myProfile --> ",error);
        
    }

}