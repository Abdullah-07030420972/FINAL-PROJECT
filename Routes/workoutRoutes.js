

const express = require("express")

const { createWorkout, getWorkout, editWorkout, deleteWorkout } = require("../Controllers/workoutControllers")
const validateTk = require("../Middleware/validateAuth")

const router = express.Router()

router.post("./workout", validateTk, createWorkout)

router.get("./getworkout/:id", validateTk, getWorkout)

router.put("./edit_workout/:id", validateTk, editWorkout)

router.delete("./delete_workout/:id", validateTk, deleteWorkout)

module.exports = router