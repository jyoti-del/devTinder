const validator = require("validator")
const validationSignUpData = (req) =>{
    const { firstName , lastName , emailId , password } = req.body;
    
    if(!firstName || !lastName){
        throw new Error("Please enter the name")
    }else if (firstName.length < 4 || firstName.length > 50){
        throw new Error("First Name should be between 4 to 50 characters")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid email id")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please choose strong password")
    }
}

module.exports = {validationSignUpData}