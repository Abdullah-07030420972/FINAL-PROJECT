

const express = require("express")

const { signUp, signIn, all_Users } = require("../Controllers/authController")

const { validateRegistration, validateLogin } = require("../Middleware/validations")

const router = express.Router()

router.post("/register", validateRegistration, signUp)

router.post("./login", validateLogin, signIn)

router.get("./users", all_Users)

module.exports = router