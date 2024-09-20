

const express = require("express")

const { signUp, signIn, getWorkout, deleteWorkout, exercise,  mealPlan, createWorkout, all_Users, userprogress, get_progress, update, delete_progress, editWorkout } = require("../Controllers/authController")

const { validateRegistration, validateLogin } = require("../Middleware/validations")

const router = express.Router()

router.post("/register", validateRegistration, signUp)

router.post("./login", validateLogin, signIn)

router.post("./workout", createWorkout)

router.get("./getworkout/:id", getWorkout)

router.get("./users", all_Users)

router.put("./edit_workout/:id", editWorkout)

router.delete("./delete_workout/:id", deleteWorkout)

router.post("./meal", mealPlan)

router.post("./exercise", exercise)

router.post("./userProgress", userprogress)

router.get("./getprogress/:id", get_progress)

router.put("./update_progress/:id", update)

router.delete("./deleteProgress/:id", delete_progress)

module.exports = router