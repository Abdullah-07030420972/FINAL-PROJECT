

const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({

  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  weight: {type: String, require: true},
  workoutAchivement: {type: String, require: true},

  bodyMeasurement: {
    chest: {type: Number, require: true},
    waist: {type: Number, require: true},
    hips: {type: Number, require: true},
    hight: {type: Number, require: true}
  }
}, {
  timestamps: true 
})

const progress = mongoose.model("progress", progressSchema)

module.exports = progress