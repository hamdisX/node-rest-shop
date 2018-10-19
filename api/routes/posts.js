const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/posts')
const Bear = require("../models/post")





router.get('/',ProductController.posts_get );




router.post("/", ProductController.posts_post);


router.get("/:id", ProductController.posts_getById);



router.patch('/:id',ProductController.posts_update);


 router.put('/:id',ProductController.posts_update)


router.delete("/", ProductController.posts_delete);

router.delete("/:id", ProductController.posts_deleteOne);




module.exports = router