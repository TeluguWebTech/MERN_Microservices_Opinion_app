
const express = require("express")
const controller = require("../controllers/userContoller")

const app = express.Router()

// post, get, put, delete

app.post("/register", controller.userRegister)
app.post("/login", controller.userLogin)

module.exports = app


