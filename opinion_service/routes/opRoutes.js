
const express = require("express");
const router = express.Router();

const controller = require("../controllers/opController");
const middleware = require("../middlewares/userMiddleware")

// CREATE
router.post("/post-comm", middleware.userMiddleware, controller.createOp);

// READ: All opinions for a topic
router.get(
    "/show-comments/:topicId",
    controller.getTopicOpinions
);

// READ: One opinion
router.get("/show-comment/:id", controller.getOneOp);

// UPDATE
router.put("/update-comment/:id", middleware.userMiddleware, controller.updateOp);

// DELETE
router.delete("/delete-comment/:id", middleware.userMiddleware, controller.deleteOp);

module.exports = router;
