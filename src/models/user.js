const mongoose = require("mongoose")
const validator = require('validator')
const { default: isURL } = require("validator/lib/isURL")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minValue : 4,
        maxValue : 20,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Keep strong password")
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value){
           if(!["male" , "female", "others"].includes(value)){
              throw new Error("Please enter valid gender")
           }
        }
    },
    photoUrl :{
        type : String,
        default : "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
        validate(value){
           if(!validator.isURL(value)){
            throw new Error("Please enter valid url")
           }
        }
    },
    about : {
        type : String,
        default : "This is about section"
    },
    skills :{
        type : [String],
    }
} , {timestamps : true})

const User = mongoose.model("User" , userSchema)
module.exports = {User}