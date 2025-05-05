const mongoose = require('mongoose')

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://NamasteNode:abcdefghijklmnopqrstuvwxyz@namastenode.ufdnnzo.mongodb.net/devTinder')
}

module.exports = {connectDB}