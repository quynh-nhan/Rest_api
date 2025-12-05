var express = require("express");
var router= express.Router();
var imageRouter=require("../model/image");
// Post: them,Put: cap nhat,Delete:xoa,Get:lay
// them moi 1 danh muc
// localhost:3000/category/add-category 
 router.post("/add-image", async function(req,res){
    try{
        // nhan/lay du lieu
        const {productID,link}=req.body;
        // tao object luu db 
        const newimg = {productID,link};
        // luu object vao db
        await imageRouter.create(newimg);
        res.status(200).json({status:true,message:"Thanh cong"});
    }catch(e){
        res.status(400).json({status:false,message:"khong thanh cong" +e });
    }
 });
 // localhost:3000/category/update-category
 // cap nhat 
 router.put("/update-image", async function(req,res) {
    const{id,producttID,link}= req.body;

    const item = await imageRouter.findById(id);
    // const item2 = await categoryRouter.find({_id:id})
    if(item){
        // update
        item.ProducttID = ProducttID ? ProducttID: item.ProducttID;
        item.Link = Link ? Link : item.Link;
        await item.save();
        res.status(200).json({status:true,message:"cap nhat thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 // xoa
 // localhost:3000/category/delete-category?id=efg
 router.delete("/delete-image", async function (req,res) {
    const{id} = req.query;
    const item = await imageRouter.findById(id);
    if(item){
        await imageRouter.findByIdAndDelete(id);
         res.status(200).json({status:true,message:"xoa thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 // xoa 2
 // localhost:3000/category/delete-category/
 router.delete("/delete-category-2/:id", async function (req,res) {
    const{id} = req.params;
    const item = await imageRouter.findById(id);
    if(item){
        await imageRouter.findByIdAndDelete(id);
         res.status(200).json({status:true,message:"xoa thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 module.exports=router;