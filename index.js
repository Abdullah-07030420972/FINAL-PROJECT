
const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const authRouter = require("./Routes/authRoutes")
const exercisesRouter = require("./Routes/exercisesRoutes")
const mealRouter = require("./Routes/mealRoutes")
const progressRouter = require("./Routes/progressRoutes")
const workoutRouter = require("./Routes/workoutRoutes")



const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan())

const PORT = process.env.PORT || 8000

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=> console.log("MongoDB Connected successfully"))

app.listen(PORT, ()=>{
  console.log(`server active on PORT ${PORT}`)
})

app.get("/", (request, response)=>{
  return response.status(200).json({message: "welcome to our workout session!"})
})

app.use("/api", authRouter)
app.use("/api", exercisesRouter)
app.use("/api", mealRouter)
app.use("/api", progressRouter)
app.use("/api", workoutRouter)

app.use((request, response)=>{
  return response.status(404).json({message: "Page does not exist"}) 
})