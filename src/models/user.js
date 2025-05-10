const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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



userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id : user._id} , "Dev@Tinder" )
    return token
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;

    const validate = await bcrypt.compare(password , user.password);
    return validate
}

const User = mongoose.model("User" , userSchema)
module.exports = {User}