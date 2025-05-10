const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req , res, next) =>{
   const {token} = req.cookies;

   if(!token){
    throw new Error("Token is not valid !!!")
   }

   const decodedMessage = await jwt.verify(token , "Dev@Tinder" , {expiresIn : '1d'})
   const { _id } = decodedMessage;

   const user = await User.findById(_id)
   if(!user){
    throw new Error("user is not found")
   }

   req.user = user;
   next();
   
}

module.exports = { userAuth}