
const mongoose = require("mongoose")

const topicSchema = new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
})

module.exports = mongoose.model("Topic", topicSchema)
