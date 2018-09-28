const express =require("express")
const app = express();
const {router,hmd} = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

console.log("test export", hmd)
app.use('/products', router);
app.use('/orders', orderRoutes);


module.exports= app ;