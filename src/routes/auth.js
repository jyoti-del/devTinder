const express = require('express')
const {validationSignUpData} = require('../utils/validationSignupData')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { User } = require('../models/user')


const authRouter = express.Router()

authRouter.post('/signup' , async (req , res) =>{
 try{
          // validate the data
    validationSignUpData(req)
    // encrypt the password
    const {firstName , lastName , emailId , password} = req.body; 
    const passwordHash = await bcrypt.hash(password , 10);


    const user = new User({
        firstName , lastName , emailId , password : passwordHash
    })
    await user.save()
    res.send("Data saved successfully")
    }catch(err){
        res.status(400).send("Error data saving " + err.message)
    }
})

// login api
authRouter.post('/login' , async (req , res) =>{
    try{

     const {emailId , password} = req.body;

    if(!validator.isEmail(emailId)){
     throw new Error("Invalid Email")
    }

    const user = await User.findOne({emailId})
    if(!user){
      throw new Error("Invalid credentials")
    }
 
    const validPassword = await user.validatePassword(password)

    if(validPassword){
         const token = await user.getJWT()
     
        res.cookie("token" , token , {expires : new Date(Date.now() + 8 * 3600000)})
        res.send("Login successful")
    }else{
        throw new Error("Invalid credentials")
    }
   }catch(err){
     res.status(400).send("Error : " + err.message)
}
})

module.exports = {authRouter}