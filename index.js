// this is the actual server and entry point

// importing express
const express = require("express")

// initializing express into an app variable
const app = express()

// port
const port = 9877

// importing database function
const connectDb = require("./database-config/db")

// Executing database function
connectDb()

// importing user route
const userRoute = require("./routes/userRoute")


// middleware
app.use(express.json())


// testing route
app.get("/api", (request, response) => {
    response.json({message: "Welcome to my server..."})
})

// using the userRoute
app.use("/api/users", userRoute)

































// listening to port.......
app.listen(9877, () => {
    console.log("Server connected successfully");
    
})