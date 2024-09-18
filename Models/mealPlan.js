

const mongoose = require("mongoose")

const createMealPlanSchema = new mongoose.Schema({
 
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  mealName: {type: String, require: true},
  ingredients: {type: String, require: true},
  
  nutritionalInfo:{
 
    calories: {type: String, require: true},
    protein: {type: String, require: true},
    carbs: {type: String, require: true},
    fats: {type: String, require: true},
  }
}, {
  timestamps: true
})
const createMealPlan = mongoose.model("createMealPlan", createMealPlanSchema)

module.exports = createMealPlan