
const express = require("express")
const controller = require("../controllers/topicController")
const middleware = require("../middlwares/adminMiddleware")

const router = express.Router()

router.post("/post-topic", middleware.adminMiddleware, controller.createTopic)
router.get("/show-topics", controller.getTopics)
router.get("/show-topic/:id", controller.getTopicById)

module.exports = router
