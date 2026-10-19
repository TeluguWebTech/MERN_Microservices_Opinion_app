
const Opinion = require("../models/Opinion");
const {producer} = require("../config/kafka")

const axios = require('axios')

// CREATE: Post a new opinion
exports.createOp = async(req, res)=>{
    try {
        const {topicId, userName, message} = req.body
    
    const userId = req.user.userId

    await axios.get(`http://localhost:8002/topic/show-topic/${topicId}`)

    const record = await Opinion.create(
        {topicId, userName, message, userId}
    )

    await producer.send({
        topic:"opinion.created",
        messages:[
            {
                key: String(record._id),
                value: JSON.stringify(record)
            }
        ]
    })

    return res.status(201).json({msg:"opion or comment posted" , record})
    } catch (error) {
         console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
    }
}

// READ: Get all opinions for a particular topic
exports.getTopicOpinions = async (req, res) => {
    try {
        const { topicId } = req.params;

        const result = await Opinion.find({ topicId })

        return res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


// READ: Get one opinion by ID
exports.getOneOp = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Opinion.findById(id);

        if (!result) {
            return res.status(404).json({
                msg: "Opinion not found"
            });
        }

        return res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


// UPDATE: Edit your own opinion
exports.updateOp = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const userId = req.user.userId;

        if (!message || !message.trim()) {
            return res.status(400).json({
                msg: "Message is required"
            });
        }

        const result = await Opinion.findOneAndUpdate(
            { _id: id, userId },
            { $set: { message: message.trim() } },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({
                msg: "Opinion not found or you are not authorized to edit it"
            });
        }

        return res.status(200).json({
            msg: "Opinion updated successfully",
            result
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


// DELETE: Delete your own opinion
exports.deleteOp = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const result = await Opinion.findOneAndDelete({
            _id: id,
            userId
        });

        if (!result) {
            return res.status(404).json({
                msg: "Opinion not found or you are not authorized to delete it"
            });
        }

        return res.status(200).json({
            msg: "Opinion deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};
