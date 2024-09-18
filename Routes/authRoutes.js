

const express = require("express")

const { signUp, signIn, getWorkout, editUser, deleteWorkout, exercise,  mealPlan, createWorkout, all_Users } = require("../Controllers/authController")

const { validateRegistration, validateLogin } = require("../Middleware/validations")

const router = express.Router()

router.post("/register", validateRegistration, signUp)

router.post("./login", validateLogin, signIn)

router.post("./workout", createWorkout)

router.get("./getworkout", getWorkout)

router.get("./users", all_Users)

router.post("./edit", editUser)

router.delete("./delete", deleteWorkout)

router.post("./meal", mealPlan)

router.post("./exercise", exercise)

module.exports = router