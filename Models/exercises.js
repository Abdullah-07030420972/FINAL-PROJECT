

const mongoose = require("mongoose")

const createExercisesSchema = new mongoose.Schema({
 
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  name: {type: String, require: true},
  type: {type: String, require: true},
  duration: {type: Number},
  caloriesBurned: {type: Number}
}, {
  timestamps: true
}
)
const createExercises = mongoose.model("createExercises", createExercisesSchema)

module.exports = createExercises