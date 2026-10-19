
const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const topicRoutes = require("./routes/topicRoutes")

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

app.use("/topic", topicRoutes)
app.listen(PORT,()=>{
    console.log(`sever running ${PORT}`)
})