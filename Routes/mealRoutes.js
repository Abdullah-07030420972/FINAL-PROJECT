

const express = require("express")

const { mealPlan, get_meal, update_meal, deletemeal } = require("../Controllers/mealController")

const router = express.Router()

router.post("./meal", mealPlan)

router.get("./getMealPlan/:userId", get_meal)

router.put("./updateMeal/:userId", update_meal)

router.delete("./deleteplan/:userId", deletemeal)

module.exports = router