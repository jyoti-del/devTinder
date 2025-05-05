const express = require('express');
const {connectDB} = require('./config/database');
const { User } = require('./models/user');
const app = express();

const port = 7777

app.post('/signup' , async (req , res) =>{
    const user = new User({
        firstName : "Ujjwal",
        lastName  : "Bhardwaj",
        emailId : "ujjwal.bhardwaj@gmail.com",
        password : '123'
    })

    try{
    await user.save()
    res.send("Data saved successfully")
    }catch(err){
        res.status(400).send("Error data saving" + err.message)
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
