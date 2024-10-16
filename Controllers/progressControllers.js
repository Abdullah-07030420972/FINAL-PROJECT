
const progress = require("../Models/userProgress")
const jwt = require("jsonwebtoken")
const {validateTk} = require("../Middleware/validateAuth")

const userprogress = async(request, response)=>{
  try {

    const{ height, weight, chest, waist, hips, workoutAchievement} = request.body

    if(!height || !weight || !chest || !waist || !hips || !workoutAchievement){
      return response.status(400).json({message: "All field are required"})
    }

    const userProgress = new progress.create({weight, height, workoutAchievement,

      bodymeasurement: {
        chest, 
        waist, 
        hips,
        height
      }}
    )

    await userProgress.save()

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({message: "sucessful", accessToken, progress: userProgress})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const get_progress = async(request, response)=>{
  try {
    
    const { userId } = request.params

    const getProgress = await progress.findById({userId})

    if(!getProgress){
      return response.status(400).json({message: "No progress found!"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({
      message: "sucessfull", accessToken, 
      getProgress}) 

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update = async(request, response)=>{
  try {
    
    const {userId} = request.params

    const{ weight, workoutAchievement, bodyMeasurement} = request.body

    const updateProgress = await progress.finAndUpdate(
      {userId}, 
      {weight, workoutAchievement, bodyMeasurement},
      {new: true}
    )

    if(!updateProgress){
      return response.status(400).json({message: "progress not found!"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({message: "Successful",
    progress: accessToken, updateProgress
    })
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }
}

const delete_progress = async(request, response)=>{
  try {
    const {userId} = request.params

    const deleteProgress = await progress.findByIdAndDelete ({userId})

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})

    return response.status(200).json({messge: "Successful", accessToken})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = {
  userprogress,
  get_progress,
  update,
  delete_progress
}