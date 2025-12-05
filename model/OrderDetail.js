const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const orderDetailScheme = new Schema({
   OrderID:{
        type:ObjectId,ref:'order'
    },
    productID:{
        type:ObjectId,ref:'product'
    },
    Quantity:{
        type:Number
    },
    Price:{
        type:Number
    }
});
module.exports = mongoose.models.orderdetail || mongoose.model('orderdetail', orderDetailScheme);
// category -----> categories
