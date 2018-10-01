const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String,  unique : true, required : true},
    price: { type: Number, required: true },
    productImage: { type: String }
});

module.exports = mongoose.model('Product', productSchema);