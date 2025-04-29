const express = require('express');

const app = express();

const port = 7777

// app.use('/' , (req , res) =>{
//     res.send("healthy")
//  })

app.use('/test' , (req , res) =>{
   res.send("test test test!")
})
app.use('/hello' , (req , res) =>{
    res.send("hello hello hello!")
})
app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
})