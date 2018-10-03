const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const mongoose = require ("mongoose")
const multer = require('multer');
const checkAuth = require('../midlware/check-auth')
const ProductController = require('../controllers/products')
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

router.get('/',checkAuth,ProductController.products_get );




router.post("/",checkAuth,upload.single("productImage"), ProductController.products_post);


router.get("/:productId",checkAuth, ProductController.products_getById);



router.patch('/:productId',checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});


router.delete("/:productId",checkAuth, ProductController.products_delete);


const hmd="hmd"

module.exports = {router,
	hmd}
