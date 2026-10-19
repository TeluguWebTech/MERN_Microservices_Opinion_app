
const express = require("express")
const controller = require("../controllers/adminController")

const app = express.Router()

// post, get, put, delete

app.post("/register", controller.adminRegister)
app.post("/login", controller.adminLogin)

module.exports = app


