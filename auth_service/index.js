
const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/uerRoutes")


const app = express()
dotEnv.config()
const PORT = process.env.PORT
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("auth_db connected")
})
.catch((err)=>{
    console.log(err.message)
})

app.use("/admin", adminRoutes)
app.use("/user", userRoutes)

app.listen(PORT,()=>{
    console.log(`sever running ${PORT}`)
})