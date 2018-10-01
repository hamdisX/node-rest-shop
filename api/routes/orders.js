const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const Product = require("../models/product")
const Order = require("../models/orders")

router.get('/', (req, res, next) => {
    Order.find().populate("product").select("product.name").then(
        orders=>{
            res.status(200).json(
                {
                    orders
                }
            )
        }
    )
});



router.post("/", (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        return order.save();
      }).then(
          rslt=>{
              res.status(202).json({
                
                result:rslt
              })
          }
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });






router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;