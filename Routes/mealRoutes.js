

const express = require("express")

const { mealPlan, get_meal, update_meal, deletemeal } = require("../Controllers/mealController")

const router = express.Router()

router.post("./meal", mealPlan)

router.get("./getMealPlan", get_meal)

router.put("./updateMeal", update_meal)

router.delete("./deleteplan", deletemeal)

module.exports = router