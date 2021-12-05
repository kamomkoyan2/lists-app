const express = require('express');
const router = express.Router();
const auth = require('../_middleware/auth')

// user controller
const userController = require('../controllers/user.controller')

// routes

// router.get('/',  userController.getAll);
router.get('/me', auth.isAuth(), userController.getUserPosts);
router.patch('/me', auth.isAuth(), userController.updateSchema, userController.updateUser);
router.delete('/me', auth.isAuth(), userController._delete);


module.exports = router;
