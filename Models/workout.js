

const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({
  
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 
  workoutName: {type: String, require: true},
  exercises: {type: String, require: true},
  duration: {type: Number},
  date: {type: String, require: true}
}, {
  timestamps: true 
})
const workout = mongoose.model("workout", workoutSchema)

module.exports = workout