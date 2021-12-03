const express = require('express');
const router = express.Router();
const auth = require('../_middleware/auth')

// user controller
const {createList, updateList} = require('../controllers/list.controller')

router.post('/list', auth.isAuth(), createList);
router.patch('/list/:id', auth.isAuth(), updateList);


module.exports = router;
