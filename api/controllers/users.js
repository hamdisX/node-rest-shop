const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserModel = require("../models/user");

exports.user_signup= (req, res, next) => {
    UserModel.find({ email: req.body.email }).then(usr => {
        if (usr.length >= 1)
            return (
                res.status(500).json({
                    message: "mail exist"
                }))

        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    return res.status(404).json({
                        errhash: err
                    })
                else {
                    const user = new UserModel({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(rslt => res.status(200).json({
                        rslt
                    })).catch(err => {
                        res.status(500).json({
                            err: err
                        });
                    });

                }
            })
        }
    })

};


exports.user_delete=(req, res) => {
    UserModel.remove(
        {
            _id: req.params.usrId
        }
    ).then(
        result => res.status(200).json({
            message: result
        })
    )
        .catch(err => res.status(500).json(err))
}

exports.user_login= (req, res) => {
    UserModel.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    "message": "faild auth"
                })
            }
            console.log(req.body.password)
            console.log(user[0].password)
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log("result", result)
                if (err) {
                    res.status(401).json({
                        "message": "FAILD AUTH"
                    })
                }
                if(result==true){
                console.log('process.env.JWT_KEY',process.env.JWT_KEY)
                console.log('process.env.JWT_KEY',process.env.MONGO_ATLAS_PW)
                const token =jwt.sign({userId:user[0]._id,email:user[0].email},"secret",{expiresIn:"1h"})
                res.status(200).json({
                    "token": token
                })}else{
                    res.status(401).json({
                        "message": "FAILD AUTH"
                    })
                }

               
            })

        })
        .catch(err => res.status(500).json(err))
}

