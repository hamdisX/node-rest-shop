
const jwt = require('jsonwebtoken')


exports.generate_token=(user)=>{
    const token =jwt.sign({userId:user[0]._id,email:user[0].email},"secret",{expiresIn:`60000`})
    res.status(200).json({
        "token": token
    })}
    

