
const mongoose = require('mongoose');
const autoIncrement =require('mongoose-auto-increment')

const db = mongoose.connection;

autoIncrement.initialize(db);

const postSchema = mongoose.Schema({

    id:Number,
   
    title:{type:String},

    body: {type:String},
    userId: { type: Number,  ref: 'User' }
});


var Post= mongoose.model('Post', postSchema);

postSchema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: 'id',
    startAt: 1});

module.exports = Post
