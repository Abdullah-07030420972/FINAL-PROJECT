
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const user = require("../Models/userProfile")


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
      return response.status(404).json({message: "Account not found please create an account!!"})
    }

    const isMatched = bcrypt.compare(newUser.password, password)

    if(!isMatched){
      return response.status(500).json({message: "Invalid Email or Password!"})
    }

    return response.status(200).json({
      message:"Login Successful",
      newUser,
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
 
module.exports = {
  signUp,
  signIn,
  all_Users
}
