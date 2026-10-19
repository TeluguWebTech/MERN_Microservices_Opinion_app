
const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const opRoute = require("./routes/opRoutes")
const {connectProducer} = require("./config/kafka")


const app = express()
dotEnv.config()
const PORT = process.env.PORT
app.use(express.json())

connectProducer()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("auth_db connected")
})
.catch((err)=>{
    console.log(err.message)
})
app.use("/opinion", opRoute)


app.listen(PORT,()=>{
    console.log(`sever running ${PORT}`)
})