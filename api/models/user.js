const mongoose = require('mongoose');
const autoIncrement =require('mongoose-auto-increment')

const db = mongoose.connection;

autoIncrement.initialize(db);

const userSchema = mongoose.Schema({

     _id: mongoose.Schema.Types.ObjectId,
     
     id : Number,
   
    username:{type:String},

    email: { 
        type: String, 
        unique: true, 
        required: true, 
    },
    password: { type: String, required: true }
});


var User= mongoose.model('User', userSchema);

userSchema.plugin(autoIncrement.plugin,
    {
    model: 'User',
    field: 'id',
    startAt: 1
});

module.exports = User
