const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const UserModel = require("../models/user");

router.post("/signup", (req, res, next) => {
    UserModel.find({ email: req.body.email }).then(usr => {
        if (usr.length >= 1) 
        return(
            res.status(500).json({
                message: "mail exist"
            }) )
        
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

});


router.delete("/:usrId",(req,res)=>{
    UserModel.remove(
        {
            _id:req.params.usrId
        }
    ).then(
        result=>res.send(200).json({
            message:result
        })
    )
    .catch(err=>res.send(500).json(err))
})

module.exports = router 