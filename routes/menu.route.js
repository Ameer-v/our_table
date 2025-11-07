const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { authorize } = require('../middlewares/auth.middleware');
const { IsAdmin } = require('../middlewares/role-validation');

router.get('/', menuController.getAllMenu);
router.get('/:key', menuController.findMenu);

router.post('/', authorize, IsAdmin, menuController.addMenu);
router.put('/:id', authorize, IsAdmin, menuController.updateMenu);
router.delete('/:id', authorize, IsAdmin, menuController.deleteMenu);

module.exports = router;
