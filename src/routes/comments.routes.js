const express = require("express");
const router = express.Router();
const auth = require("../_middleware/auth");

// comment controller
const commentController = require("../controllers/comment.controller");

router.post("/comment", auth.isAuth(), commentController.createComments);

module.exports = router
