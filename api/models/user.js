const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username:{type:String,unique:true},
    email: { 
        type: String, 
        unique: true, 
        required: true, 
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);