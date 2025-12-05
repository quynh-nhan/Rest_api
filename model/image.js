const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const imgScheme = new Schema({
    id:{type:String},
   link:{type:String},
    productID:{
        type:ObjectId,ref:'product'
    },
});
module.exports = mongoose.models.image || mongoose.model('image', imgScheme);
// category -----> categories
