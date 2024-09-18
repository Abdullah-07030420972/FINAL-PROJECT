

const express = require('express')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const authRoute = require("./Routes/authRoutes")


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=> console.log("MongoDB Connected sucessfully"))

app.listen(PORT, ()=>{
  console.log(`server active on PORT ${PORT}`)
})

app.get("/", (request, response)=>{
  return response.status(200).json({message: "welcome to our server"})
})

app.use("/api", authRoute)

app.use((request, response)=>{
  return response.status(404).json({message: "Page not found!"}) 
})