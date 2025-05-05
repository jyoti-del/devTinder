const express = require('express');
const {connectDB} = require('./config/database')
const {adminAuth , userAuth} = require('./middleware/auth')
const app = express();

const port = 7777

connectDB().then(() =>{
  console.log("Database connected successfully")
  app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
})
}).catch((err) =>{
    console.log("Database connection error")
})

// handle auth middleware for post, get, put , delete
app.use('/admin' ,adminAuth)
app.get('/admin/getAllData' , (req , res)=>{
      res.send("Get all Data")
})

app.use('/admin/deleteAllData' , (req , res) =>{
    res.send("Delete all data")
})

app.use('/user' , userAuth , (req , res) =>{
    res.send("User data sent")
})

app.post('/login' , (req , res) =>{
    res.send("User logged in successfully")
})

// will give me error to handle it we need try/catch or err method
app.use('/getAll' , (req , res)=>{
    throw new Error("acdeekj")
})

app.use('/' , (err , req , res , next) =>{
   if(err){
    res.status(500).send("Something went wrong")
   }
})

app.use('/getAll3' , ( req , res ) =>{
    try{
       throw new Error("Error handler")
    }catch(err){
        res.status(500).send("Some Error")
    }
 })

// try to put it at last so anything breaks will come here
 app.use('/' , (err , req , res , next) =>{
    if(err){
     res.status(500).send("Something went wrong")
    }
 })
// app.listen(port , () =>{
//     console.log(`Server is listening on port ${port}`)
// })