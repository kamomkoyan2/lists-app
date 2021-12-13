const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const db = require("../db/models");

exports.createComments = async (req, res, next) => {
  const comment = new Comment({
    ...req,
    body,
    userId: user.userId,
  });
  try {
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
