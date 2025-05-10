const express = require('express')

const requestsRouter = express.Router()
const {userAuth} = require('../middleware/auth')

requestsRouter.post('/sendConnectionRequest' , userAuth , async(req , res) =>{
    try{
       const user = req.user;
       res.send(user.firstName + " send a connection request")
    }catch(err){
        res.status(400).send("Error" + err.message)
    }
}) 

module.exports = {requestsRouter}