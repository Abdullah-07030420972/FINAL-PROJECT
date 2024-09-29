
const createExercises = require("../Models/exercises")


const exercise = async(request, response)=>{
  try {
    
    const {userId} = request.params

    const {name, type, duration, caloriesBurned} = request. body 

    if(!name || !type || !duration || !caloriesBurned){
      return response.status(400).json({message: "All field are required"})
    }

    const userExercises = new createExercises.create({
      userId, 
      name, type, duration, caloriesBurned})
      

    await userExercises.save()

    return response.status(200).json({
      message: "Exercise Created Successfully",
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

    if(!userExercises){
      return response.status(400).json({message: "No exercises plan found"})
    }

    return response.status(200).json({
      message: "successfull",
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

    const updatedExercise = await createExercises.findByIdAndUpdate (userId,
      {name, type, duration, caloriesBurned},
      {new: true}
    )

    if(!updatedExercise){
      return response.status(400).json({message: "Exercise not found"})
    }

    return response.status(200).json({message: "successfull",
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

    return response.status(200).json({message: "Successful"})

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