const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authorize } = require('../middlewares/auth.middleware');
const { IsAdmin, IsUser } = require('../middlewares/role-validation');

router.post('/', authorize, IsAdmin, userController.addUser);

router.get('/', authorize, IsAdmin, userController.getAllUser);
router.get('/:key', authorize, IsAdmin, userController.findUser);
router.put('/:id', authorize, IsUser, userController.updateUser);
router.delete('/:id', authorize, IsAdmin, userController.deleteUser);

module.exports = router;
