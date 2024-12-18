var express = require('express');
const plm = require('passport-local-mongoose')
const mongoose = require("mongoose")

/* GET users listing. */
mongoose.connect("mongodb://localhost:27017/pinterest").then(()=>{
    console.log("mongo server is running")
})

const userSchema = mongoose.Schema({
    username:String,
    secret:String,
    posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }
        
    ]
})

userSchema.plugin(plm)
const userModel = mongoose.model('User', userSchema)
module.exports = userModel;
