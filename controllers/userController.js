// User Controllers will be defined here(every function that user will perform)
// this folder will contain every function a user will perform


// import your usermodel
const User = require("../models/userModels")
const bcrypt = require("bcrypt")

const registerUser = async (request, response) => {
    // request body comes from the front-end
    const {firstName, lastName, email, phone, password} = request.body

    const userExists = await User.findOne({email})
    if (userExists) {
        response.status(400).json({error : "User already exists..."})
    }

    const newUser = await User.create({firstName, lastName, email, phone, password})
    if (newUser) {
        response.status(201).json({message : "User registered succesfully"})
    } else {
        response.status(400).json({error : "Invalid user data"})
    }
}

const loginUser = async (request, response) => {
    // Extract email and password from the request body
    const { email, password } = request.body;

    // Check if user exists by email
    const user = await User.findOne({ email });
    
    if (!user) {
        return response.status(400).json({ error: "Invalid email or password" });
    }

    // Verify password (assuming passwords are hashed using bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return response.status(400).json({ error: "Invalid email or password" });
    } else {
        response.status(200).json({message: "Login successful",})
    }
}

// every function you create inside the user controller, you have to export it here inside the curly brace
module.exports = {registerUser, loginUser}