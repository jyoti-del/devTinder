const express = require('express');
const {connectDB} = require('./config/database');
const { User } = require('./models/user');
const app = express();

const port = 7777

app.use(express.json())

app.post('/signup' , async (req , res) =>{
    const user = new User(req.body)

    try{
    await user.save()
    res.send("Data saved successfully")
    }catch(err){
        res.status(400).send("Error data saving" + err.message)
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
app.patch('/user' , async(req , res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{
      await User.findByIdAndUpdate(userId , data);
      res.send("User updated successfully")
    }catch(err){
        res.status(400).send("Something went wrong")
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
        res.status(400).send("Something went wrong")
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
