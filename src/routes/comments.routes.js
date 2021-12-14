const express = require("express");
const router = express.Router();
const auth = require("../_middleware/auth");

// comment controller
const { createComment } = require("../controllers/comment.controller");

router.post("/comment", auth.isAuth(), createComment);

module.exports = router;
