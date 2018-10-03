
const Product = require("../models/product")
const mongoose = require ("mongoose")
const multer = require('multer');


exports.products_get=(req, res, next) => {
    console.log("req1 ",req.cookies)
      Product.find()
      .select("name price _id")
      .exec()
      .then(docs => {
        const response={
          count:docs.length,
          product:docs.map(n=>{
            return {
              name:n.name,
              price:n.price,
              _id: n._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + n._id
            }
          }})
        }
        res.status(200).json(response);
  }) .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
   
  
  }

  exports.products_post=(req, res, next) => {
    //console.log(req.file)
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    });
    product
      .save()
      .then(rsl => {
        res.status(201).json({
          message: "product added successfully",
          createdProduct: rsl
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          err: err
        });
      });
  }

  exports.products_getById=(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  exports.products_delete=(req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }