const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
        minlength: 3, // độ dài tối thiểu
        maxlength: 50, // độ dài tối đa
        default: 'No name' // giá trị mặc định
    },
    description:{type:String},
    price:{type:Number},
    quantity:{type :Number},
    status:{type:Boolean},
    createAt:{type:Date},
    updateAt:{type:Date},
    cateID:{type:ObjectId,ref:"category"}

});
module.exports = mongoose.models.product || mongoose.model('product', product);
// category -----> categories
