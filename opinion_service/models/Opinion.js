const mongoose = require("mongoose")

const opSchema = new mongoose.Schema(
    {
        topicId:{
            type:String,
            required:true,
            index:true
        },
        userId:{
            type:String,
            required:true,
            index:true
        },
        userName:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }, {timestamps:true}
)

module.exports = mongoose.model("Opinion", opSchema)