
const express = require("express")
const {startConsumer} = require("./config/kafkaConsumer")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8004

const startService = async()=>{
    try {
        await startConsumer()

        app.listen(PORT, ()=>{
            console.log(`connect_service running @${PORT}`)
        })

    } catch (error) {
        console.log(error.message)
    }
}
startService()