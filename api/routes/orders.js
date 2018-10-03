const express = require('express');
const router = express.Router();
const checkAuth = require('../midlware/check-auth')
const OrdersController = require('../controllers/orders')

router.get('/',checkAuth, OrdersController.orders_get);


router.post("/",checkAuth, OrdersController.orders_post);


router.get('/:orderId',checkAuth, OrdersController.orders_getById);

router.delete('/:orderId', checkAuth,OrdersController.orders_delete);

module.exports = router;