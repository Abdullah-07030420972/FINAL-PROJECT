
const createExercises = require("../Models/exercises")
const jwt = require("jsonwebtoken")
const validateTk = require("../Middleware/validateAuth")


const exercise = async(request, response)=>{
  try {
    
    const {userId} = request.params

    const {name, type, duration, caloriesBurned} = request. body 

    if(!name || !type || !duration || !caloriesBurned){
      return response.status(400).json({message: "All field are required"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})


    const userExercises = new createExercises.create({
      userId, 
      name, type, duration, caloriesBurned})
      
    await userExercises.save()

    return response.status(200).json({
      message: "Exercise Created Successfully",
      accessToken,
      userExercises
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const get_exercise = async(request, response)=>{
  try {

    const { userId } = request.params

    const userExercises = await createExercises.findById({userId})

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    if(!userExercises){
      return response.status(400).json({message: "No exercises plan found"})
    }

    return response.status(200).json({
      message: "successfull",
      accessToken,
      userExercises
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update_exercise = async (request, response)=>{
  try {
    
    const {userId} = request.params

    const {name, type, duration, caloriesBurned } = request.body

    if(!name|| !type|| !duration|| !caloriesBurned){
      return response.status(400).json({message: "All fields are required"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    const updatedExercise = await createExercises.findByIdAndUpdate (userId,
      {name, type, duration, caloriesBurned},
      {new: true}
    )

    if(!updatedExercise){
      return response.status(400).json({message: "Exercise not found"})
    }

    return response.status(200).json({message: "successfull",
      accessToken,
      updatedExercise
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const delete_exercise = async (request, response)=>{
  try {
    const { userId } = request.params

    const deletedMeal = await createExercises.findByIdAndDelete({userId})

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({message: "Successful", accessToken})
    

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = {
  exercise,
  get_exercise, 
  update_exercise,
  delete_exercise
}