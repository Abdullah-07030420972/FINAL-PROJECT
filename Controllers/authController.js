
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const user = require("../Models/userProfile")
const workout = require("../Models/workout")
const createMealPlan = require("../Models/mealPlan")
const createExercises = require("../Models/exercises")
const progress = require("../Models/userProgress")


const signUp = async(request, response)=>{
  try {

    const { username, email, password, age, gender, fitnessGoals } = request.body

    const hashedpassword = await bcrypt.hash(password, 8)

    const newUser = new user({username, email, password:hashedpassword, age, gender, fitnessGoals})

    await newUser.save()

    await sendEmail( email )
  
    return response.status(200).json({message: "Registration Successful", user: newUser})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const signIn = async(request, response)=>{
  try {

    const { email, password } = request.body

    const newUser = await user.findOne({email})

    if(!newUser){
      return response.status(404).json({message: "Account not Found Please Create Account"})
    }

    const isMatched = bcrypt.compare(newUser.password, password)

    if(!isMatched){
      return response.status(500).json({message: "Invalid Email or Password!"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})


    return response.status(200).json({
      message:"Login Successful",
      accessToken,
      newUser,
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const createWorkout = async(request, response)=>{
  try {
    
    const { userId } = request.params

    const {workoutName, exercises, duration} = request.body

    if(!workoutName || !exercises || !duration){
      return response.status(400).json({message: "All field are required"})
    }

    const createWorkout = new workout(
      userId, 
      {workoutName, exercises, duration})
      
    await createWorkout.save()
  
    return response.status(200).json({
      message: "Workout Created Successfully",
      createWorkout
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const getWorkout = async (request, response)=>{
  try {
    const { userId } = request.params

    const userWorkout = await workout.findById( id )

    if (!userWorkout){
      return response.status(400).json({message: "Workout not found"})
    }

    return response.status(200).json({
      message: "successfull",
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
  
    return response.status(200).json({
      message: "Sucessful", 
      user: updatedUser})
  
    } catch (error) {
      return response.status(400).json({ message: error.message })    
    }
}

const deleteWorkout = async (request, response)=>{
  try {
    const { id } = request.params

    const deletedWorkout = await workout.findByIdAndDelete(id)

    return response.status(200).json({message: "Successfully"})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const mealPlan = async (request, response) => {
  try {

    const { userId } = request.params

    const { mealName, ingredients, calories, protein, carbs, fats } = request.body;

    if(!mealName || !ingredients || !calories || !protein || !carbs || !fats){
      return response.status(400).json({message: "All fields are required"})
    }

    const userMealPlan = new createMealPlan({
      userId,
      mealName,
      ingredients,
      nutritionalInfo: {
        calories,
        protein,
        carbs,
        fats,
      }
    })

    await userMealPlan.save();

    return response.status(200).json({
      message: "Successful",
      userMealPlan,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const exercise = async(request, response)=>{
  try {
    
    const {userId} = request.params

    const {name, type, duration, caloriesBurned} = request. body 

    if(!name || !type || !duration || !caloriesBurned){
      return response.status(400).json({message: "All field are required"})
    }

    const userExercises = new createExercises(
      userId, 
      {name, type, duration, caloriesBurned})

    await userExercises.save()

    return response.status(200).json({
      message: "Exercise Created Successfully",
      userExercises
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const all_Users = async(request, response)=>{
  try {

    const Users = await user.find()

    return response.status(200).json({
      message: successful,
      count,
      Users
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

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
  signUp,
  signIn,
  getWorkout,
  editWorkout,
  deleteWorkout,
  createWorkout, 
  mealPlan, 
  exercise,
  all_Users,
  userprogress,
  get_progress,
  update,
  delete_progress
}
