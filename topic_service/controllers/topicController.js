
const Topic = require("../models/Topic")


exports.createTopic = async(req, res)=>{
    const {title, desc} = req.body;
    try {
        const record = await Topic.create(
            {title, desc}
        )
        return res.status(201).json({msg:"TOpic created succes", record})
    } catch (error) {
        console.log(error.message)
             return res.status(201).json({msg:"something wrong"})
    }
}

exports.getTopics = async(req, res)=>{
    try {
        const result = await Topic.find()
        return res.status(201).json({msg:"success", result})
    } catch (error) {
        console.log(error.message)
             return res.status(201).json({msg:"something wrong"})
    }   
}

exports.getTopicById = async(req, res)=>{
    try {
            const {id} = req.params
            const record = await Topic.findById(id)
            if(!record){
                return res.status(404).json({msg:"topic not found"})
            }
             return res.status(201).json({msg:"success", record})
    } catch (error) {
        console.log(error.message)
             return res.status(201).json({msg:"something wrong"})
    }
}