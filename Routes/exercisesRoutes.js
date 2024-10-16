

const express = require("express")

const { exercise, get_exercise, update_exercise, delete_exercise } = require("../Controllers/exercisesController")

const validateTk = require("../Middleware/validateAuth")

const router = express.Router()

router.post("./exercises", validateTk, exercise)

router.get("./getExercise/:userId", validateTk, get_exercise)

router.put("./update_exercises/:userId", validateTk, update_exercise)

router.delete("./deleteExercise/:userId", validateTk, delete_exercise)

module.exports = router