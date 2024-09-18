

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    userName: {type: String, required: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    age: {type: Number, require: true},
    gender: {type: String, require: true},
    fitnessGoals: {type: String, require: true}

}, {
    timestamps: true
})
const user = mongoose.model("user", userSchema)

module.exports = user

