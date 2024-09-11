// const { default: mongoose } = require("mongoose")

// User Schema will be defined here
const mongoose = require("mongoose")

// import bcrypt 
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : String,
        required : true,
        unique : true
    },
    
    password : {
        type : String,
        required : true,
    },

},{
    // we do not define our timestamp that is why we put it in another curly brace
    timestamps : true
})


// middleware to encrypt password before saving
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)