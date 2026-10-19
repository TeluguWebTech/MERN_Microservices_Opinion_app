
const Opinion = require("../models/Opinion")

exports.createOp = async(req, res)=>{
    try {
        const {topicId, userName, message} = req.body
    
    const userId = req.user.userId

    const record = await Opinion.create(
        {topicId, userName, message, userId}
    )
    return res.status(201).json({msg:"opion or comment posted"})
    } catch (error) {
         console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
    }
}