const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');
const { authorize } = require('../middlewares/auth.middleware');
const { IsAdmin } = require('../middlewares/role-validation');

router.get('/', tableController.getAllTable);
router.post('/', authorize, IsAdmin, tableController.addTable);
router.put('/:id', authorize, IsAdmin, tableController.updateTable);
router.delete('/:id', authorize, IsAdmin, tableController.deleteTable);

module.exports = router;
