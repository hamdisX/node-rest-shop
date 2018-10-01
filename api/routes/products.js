const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const mongoose = require ("mongoose")
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
 
  filename: function (req, file, cb) {
    cb(null,Date.now()+"_"+file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//const upload = multer({dest:'uploads/'})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', (req, res, next) => {
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
 

});




router.post("/",upload.single("productImage"), (req, res, next) => {
  console.log(req.file)
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
        error: err
      });
    });
});


router.get("/:productId", (req, res, next) => {
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
});



router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});


router.delete("/:productId", (req, res, next) => {
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
});


const hmd="hmd"

module.exports = {router,
	hmd}
