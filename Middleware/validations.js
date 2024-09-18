
const user = require("../Models/userProfile")

const validateRegistration = async(request, response, next)=>{

  try {
    const { userName, email, password, age, gender, fitnessGoals } = request.body
  
  const errors = []

  if(!email || !userName || !password || !gender || !fitnessGoals || !age){
      errors.push("All fields are required")
  }

  if(password.length < 8){
      errors.push("Minimum of eight characters required for password.")
  }

  const alreadyExisting = await user.findOne({email})
  
  if(alreadyExisting){
    return response.status(400).json({message: "User already exist!"})
  }

  if(errors.length > 0){
      return response.status(400).json({message: errors})
  }

  next()
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
  
}
 
const validateLogin = async(request, response, next)=>{

  try {
    const { email, password } = request.body

    const errors = []
  
    if(!email){
        errors.push("Please add your email")
  
    } else if(!validEmail(email)){
        errors.push("Invalid Email format")
    }
  
    if(!password){
        errors.push("Please add your password")
    }
  
    if(errors.length > 0){
        return response.status(400).json({message: errors})
    }
  
    next()
   
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
  
}
 
const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  validateRegistration,
  validateLogin,
  validEmail
}