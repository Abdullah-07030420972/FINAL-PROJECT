

const express = require("express")

const { userprogress, get_progress, update, delete_progress } = require("../Controllers/progressControllers")

const router = express.Router()

router.post("./userProgress", userprogress)

router.get("./getprogress/:id", get_progress)

router.put("./update_progress/:id", update)

router.delete("./deleteProgress/:id", delete_progress)

module.exports = router