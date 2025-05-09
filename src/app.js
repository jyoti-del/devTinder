const express = require('express');
const {connectDB} = require('./config/database');
const { User } = require('./models/user');
const {validationSignUpData} = require('./utils/validationSignupData')
const bcrypt = require('bcrypt');
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express();


const port = 7777

app.use(express.json())
app.use(cookieParser())

app.post('/signup' , async (req , res) =>{
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
app.post('/login' , async (req , res) =>{
    try{

     const {emailId , password} = req.body;

    if(!validator.isEmail(emailId)){
     throw new Error("Invalid Email")
    }

    const user = await User.findOne({emailId})
    if(!user){
      throw new Error("Invalid credentials")
    }

    const validPassword = await bcrypt.compare(password , user.password);

    if(validPassword){
         const token = jwt.sign(user._id , "Dev@Tinder")
        res.cookie("token" , token)
        res.send("Login successful")
    }else{
        throw new Error("Invalid credentials")
    }
   }catch(err){
     res.status(400).send("Error : " + err.message)
}
})

// get user profile

app.get('/profile' , async(req , res) =>{
    try{
      const {token}  = req.cookies;
      if(!token){
        throw new Error("unauthorized")
      }

      const decodedMessage = jwt.verify(token , "Dev@Tinder")

      const {_id } = decodedMessage;
      const user = await User.findById(_id)
      if(!user){
        throw new Error("User does not exist")
      }
      res.send(user)
    }catch(err){
        res.status(400).send("Error "  + err.message)
    }
})

// get user by emailId
app.get('/user' , async (req , res) =>{
    const userEmail = req.body.emailId
    try{
       const user = await User.findOne({emailId : userEmail })
       if(!user){
         res.status(404).send("User Not Found")

    // const user = await User.find({emailId : userEmail})
    // if(user.length == 0){
    //     res.status(404).send("User Not Found")
       }else{
        res.send(user)
       }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
}) 


// get all users   --- feed 
app.get('/feed' , async(req , res)=>{
    try{
    const allUser = await User.find({})
    res.send(allUser)
    }catch(err){
        res.send(400).send("Something went wrong")
    }
})

// delete user 
app.delete("/user" , async (req , res) =>{
    const userId = req.body.userId
    try{
    //   const result = await User.findByIdAndDelete(userId);
    const result = await User.findByIdAndDelete({_id : userId});
       res.send("User deleted successfully")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

// update user by id
app.patch('/user/:userId' , async(req , res)=>{
    const userId = req.params?.userId
    console.log(userId)
    const data = req.body;
    try{
        const ALLOWED_UPDATES = [
           "firstName" , "age", "skills" , "gender" 
         ]
    
         const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
        console.log(isUpdateAllowed)
         if(!isUpdateAllowed){
            throw new Error("Update not allowed")
         }
    
         if(data?.skills.length > 10){
            throw new Error("Only 10 skills you can enter")
         }
      await User.findByIdAndUpdate(userId , data , {runValidators : true});
      res.send("User updated successfully")
    }catch(err){
        res.status(400).send("Something went wrong" + err.message)
    }
})

// update user by email
app.patch('/userEmail' , async(req , res) =>{
    const userEmail = req.body.emailId;
    const data = req.body;
    try{
     await User.findOneAndUpdate({emailId : userEmail} , data)
     res.send("User with email updated successfully")
    }catch(err){
        res.status(400).send("Something went wrong" , err.message)
    }
})


connectDB().then(() =>{
  console.log("Database connected successfully")
  app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
})
}).catch((err) =>{
    console.log("Database connection error")
})
