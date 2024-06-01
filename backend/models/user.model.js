import mongoose from 'mongoose'

const userShema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : 6,
        required : true
    },
    followers : [
       {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : []
       }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ],
    profileImg : {
        type : String,
        default : "",
    },
    coverImg : {
        type : String,
        default : ""
    },
    bio : {
        type : String,
        default : "",
    }, 
    link : {
        type : String,
        default : ""
    }



}, {timestamps : true})

export const User = mongoose.model("User", userShema)