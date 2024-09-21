

const express = require("express")

const { exercise, get_exercise, update_exercise, delete_exercise } = require("../Controllers/exercisesController")

const router = express.Router()

router.post("./exercises", exercise)

router.get("./getExercise", get_exercise)

router.put("./update_exercises", update_exercise)

router.delete("./deleteExercise", delete_exercise)

module.exports = router