

const express = require("express")
const { createWorkout, getWorkout, editWorkout, deleteWorkout } = require("../Controllers/workoutControllers")

const router = express.Router()

router.post("./workout", createWorkout)

router.get("./getworkout/:id", getWorkout)

router.put("./edit_workout/:id", editWorkout)

router.delete("./delete_workout/:id", deleteWorkout)

module.exports = router