
const progress = require("../Models/userProgress")



const userprogress = async(request, response)=>{
  try {

    const{ height, weight, chest, waist, hips, workoutAchievement} = request.body

    if(!height || !weight || !chest || !waist || !hips || !workoutAchievement){
      return response.status(400).json({message: "All field are required"})
    }

    const userProgress = new progress({weight, height, workoutAchievement,

      bodymeasurement: {
        chest, 
        waist, 
        hips,
        height
      }}
    )

    await userProgress.save()

    return response.status(200).json({message: "sucessful", progress: userProgress})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const get_progress = async(request, response)=>{
  try {
    
    const { Id } = request.params

    const getProgress = await progress.findById({Id})

    if(!getProgress){
      return response.status(400).json({message: "No progress found!"})
    }

    return response.status(200).json({message: "sucessfull", getProgress}) 

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update = async(request, response)=>{
  try {
    
    const {id} = request.params

    const{ weight, workoutAchievement, bodyMeasurement} = request.body

    const updateProgress = await progress.finAndUpdate(
      id, 
      {weight, workoutAchievement, bodyMeasurement},
      {new: true}
    )

    if(!updateProgress){
      return response.status(400).json({message: "progress not found!"})
    }

    return response.status(200).json({message: "Successful",
    progress: updateProgress
    })
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }
}

const delete_progress = async(request, response)=>{
  try {
    const {userId} = request.params

    const deleteProgress = await progress.findByIdAndDelete (userId)

    return response.status(200).json({messge: "Successful"})

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