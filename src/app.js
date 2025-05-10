const express = require('express');
const {connectDB} = require('./config/database');
const cookieParser = require('cookie-parser')
const app = express();

const  {authRouter}  = require('./routes/auth')
const  {profileRouter}   = require('./routes/profile')
const  {requestsRouter}  = require('./routes/requests')
const port = 7777

app.use(express.json())
app.use(cookieParser())

app.use('/' , authRouter)
app.use('/' , profileRouter)
app.use('/' , requestsRouter)

connectDB().then(() =>{
  console.log("Database connected successfully")
  app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
})
}).catch((err) =>{
    console.log("Database connection error")
})
