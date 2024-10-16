
const workout = require("../Models/workout")
const jwt = require("jsonwebtoken")
const validateTk = require("../Middleware/validateAuth")


const createWorkout = async(request, response)=>{
  try {
    
    const { userId } = request.params

    const {workoutName, exercises, duration} = request.body

    if(!workoutName || !exercises || !duration){
      return response.status(400).json({message: "All field are required"})
    }

    const createWorkout = new workout.create({
      userId, 
      workoutName, exercises, duration})
      
      
    await createWorkout.save()

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})
  
    return response.status(200).json({
      message: "Workout Created Successfully",
      accessToken,
      createWorkout
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const getWorkout = async (request, response)=>{
  try {
    const { userId } = request.params

    const userWorkout = await workout.findById({userId})

    if (!userWorkout){
      return response.status(400).json({message: "Workout not found"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({
      message: "successfull",
      accessToken,
      userWorkout
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const editWorkout = async(request, response)=>{

    try {
    const { userId} = request.params
  
    const {workoutname, exercises, duration} = request.body

    if(!workoutname || !exercises || !duration){
      return response.status(400).json({message: "All field are required"})
    }
  
    const updatedUser = await workout.findByIdAndUpdate(
      userId,
      {workoutname, exercises, duration},
      {new: true}
    )

    if(!updatedUser){
      return response.status(400).json({message: "user not found"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})
  
    return response.status(200).json({
      message: "Sucessful", 
      accessToken,
      user: updatedUser})
  
    } catch (error) {
      return response.status(400).json({ message: error.message })    
    }
}

const deleteWorkout = async (request, response)=>{
  try {
    const { userId } = request.params

    const deletedWorkout = await workout.findByIdAndDelete({userId})

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({message: "Successful", accessToken})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = {
  createWorkout,
  getWorkout,
  editWorkout,
  deleteWorkout
}