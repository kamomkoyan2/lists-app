const express = require('express');
const router = express.Router();
const auth = require('../_middleware/auth')

// user controller
const listController = require('../controllers/list.controller')

router.post('/list', auth.isAuth(), listController.createList);
router.get('/list', auth.isAuth(), listController.getLists);
router.get('/list/:id', auth.isAuth(), listController.getListById)
router.patch('/list/:id', auth.isAuth(), listController.updateList);
router.delete('/list/:id', auth.isAuth(), listController.deleteList);


module.exports = router;
