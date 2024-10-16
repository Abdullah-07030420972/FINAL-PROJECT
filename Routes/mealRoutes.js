

const express = require("express")

const { mealPlan, get_meal, update_meal, deletemeal } = require("../Controllers/mealController")
const validateTk = require("../Middleware/validateAuth")

const router = express.Router()

router.post("./meal", mealPlan)

router.get("./getMealPlan/:userId", validateTk, get_meal)

router.put("./updateMeal/:userId", validateTk, update_meal)

router.delete("./deleteplan/:userId", validateTk, deletemeal)

module.exports = router