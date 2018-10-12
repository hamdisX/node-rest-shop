const express = require('express')
const router = express.Router();
const UserController = require('../controllers/users');




router.post("/signup", UserController.user_signup);


router.delete("/:usrId", UserController.user_delete)

router.post("/login",UserController.user_login)

router.get('/signup',UserController.user_get)

router.get('/signup/:usrId',UserController.user_getById)

module.exports = router 