
const Product = require("../models/product")
const mongoose = require ("mongoose")
const multer = require('multer');

//------------- get all products -------------------------------------
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
                url: "http://localhost:5000/products/" + n._id
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


  //-----------------add product --------------------------------------
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


  // ----------------------get single product --------------------------
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

  //----------------------------- delete product--------------------------
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


  //--------------------- update product ----------------------------

  exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    console.log('req.body',req.body)
    // for (const ops of req.body) {
    //   console.log('req.body',req.body)
    //   console.log('ops.value',ops)
    //   updateOps[ops.propName] = ops.value;
    // }
    console.log('updateOps',updateOps)
    Product.update({ _id: id }, { $set: {name:req.body.name,price:req.body.price} })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/products/" + id
          },
          result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  