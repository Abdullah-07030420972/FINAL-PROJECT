

const express = require("express")

const { userprogress, get_progress, update, delete_progress } = require("../Controllers/progressControllers")
const validateTk = require("../Middleware/validateAuth")

const router = express.Router()

router.post("./userProgress", validateTk, userprogress)

router.get("./getprogress/:id", validateTk, get_progress)

router.put("./update_progress/:id", validateTk, update)

router.delete("./deleteProgress/:id", validateTk, delete_progress)

module.exports = router