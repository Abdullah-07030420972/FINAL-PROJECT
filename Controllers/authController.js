
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const validateTk = require("../Middleware/validateAuth")
const user = require("../Models/userProfile")
const workout = require("../Models/workout")
const createMealPlan = require("../Models/mealPlan")
const createExercises = require("../Models/exercises")


const signUp = async(request, response)=>{
  try {

    const { userName, email, password, age, gender, fitnessGoals } = request.body

    const hashedpassword = await bcrypt.hash(password, 8)

    const newUser = new user({userName, email, password:hashedpassword, age, gender, fitnessGoals})

    await newUser.save()

    await sendEmail( email )
  
    return response.status(200).json({message: "Registration Sucessful", user: newUser})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const signIn = async(request, response)=>{
  try {

    const { email, password } = request.body

    const user = await user.findOne({email})

    if(!user){
      return response.status(404).json({message: "Account not Found Please Create Account"})
    }

    const isMatched = bcrypt.compare(User.password, password)

    if(!isMatched){
      return response.status(500).json({message: "Invalid Email or Password"})
    }

    const accessToken = jwt.sign({user: email}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})


    return response.status(200).json({
      message:"Login Successful",
      accessToken,
      user,
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const validateToken = (request, response)=>{
  try {
    return response.status(200).json({message: "Successful", User: request.user})
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const createWorkout = async(request, response)=>{
  try {
    
    const {userId, workoutName, exercises, duration} = request.body
  
    const workout = new workout({userId, workoutName, exercises, duration})
    await workout.save()
  
    return response.status(200).json({
      message: "Workout Created Successfully",
      workout
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const getWorkout = async (request, response)=>{
  try {
    const { id } = request.params

    const workout = await workout.findById( id )

    if (!workout){
      return response.status(400).json({message: "Workout not found"})
    }

    return response.status(200).json({
      message: "successfull",
      workout
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const editUser = async(request, response)=>{

    try {
      const { id } = request.params
  
    const {username, fitnessgoals, exercises, age, gender, workoutName} = request.body
  
    const updatedUser = await user.findByIdAndUpdate(
      id,
      {username, fitnessgoals, exercises, age, gender, workoutName},
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

    return response.status(200).json({message: "Successfully deleted"})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const mealPlan = async (request, response) => {
  try {
    const { userId, mealName, ingredients, calories, protein, carbs, fats } = request.body;

    const newMealPlan = new createMealPlan({
      user: userId,
      mealName,
      ingredients,
      nutritionalInfo: {
        calories,
        protein,
        carbs,
        fats,
      },
    });

    await newMealPlan.save();

    return response.status(200).json({
      message: "Successful",
      newMealPlan,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const exercise = async(request, response)=>{
  try {
    
    const {userId, name, type, duration, caloriesBurned} = request. body 

    const exercises = new createExercises({userId, name, type, duration, caloriesBurned})

    await exercises.save()

    return response.status(200).json({
      message: "Exercise Created Successfully",
      exercise
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
      Users
    })
    
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}
 

module.exports = {
  signUp,
  signIn,
  validateToken,
  getWorkout,
  editUser,
  deleteWorkout,
  createWorkout, 
  mealPlan, 
  exercise,
  all_Users
}
