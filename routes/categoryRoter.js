var express = require("express");
var router= express.Router();
var categoryRouter=require("../model/Category");
// Post: them,Put: cap nhat,Delete:xoa,Get:lay
// them moi 1 danh muc
// localhost:3000/category/add-category 
 router.post("/add-category", async function(req,res){
    try{
        // nhan/lay du lieu
        const {CateName,ParentID}=req.body;
        // tao object luu db 
        const newCate = {CateName,ParentID};
        // luu object vao db
        await categoryRouter.create(newCate);
        res.status(200).json({status:true,message:"Thanh cong"});
    }catch(e){
        res.status(400).json({status:false,message:"khong thanh cong" +e });
    }
 });
 // localhost:3000/category/update-category
 // cap nhat 
 router.put("/update-category", async function(req,res) {
    const{id,CateName,ParentID}= req.body;

    const item = await categoryRouter.findById(id);
    // const item2 = await categoryRouter.find({_id:id})
    if(item){
        // update
        item.CateName = CateName ? CateName: item.CateName;
        item.ParentID = ParentID ? ParentID : item.ParentID;
        await item.save();
        res.status(200).json({status:true,message:"cap nhat thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 // xoa
 // localhost:3000/category/delete-category?id=efg
 router.delete("/delete-category", async function (req,res) {
    const{id} = req.query;
    const item = await categoryRouter.findById(id);
    if(item){
        await categoryRouter.findByIdAndDelete(id);
         res.status(200).json({status:true,message:"xoa thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 // xoa 2
 // localhost:3000/category/delete-category/
 router.delete("/delete-category-2/:id", async function (req,res) {
    const{id} = req.params;
    const item = await categoryRouter.findById(id);
    if(item){
        await categoryRouter.findByIdAndDelete(id);
         res.status(200).json({status:true,message:"xoa thanh cong"})
    }else{
        res.status(200).json({status:false,message:"Khong tim thay san pham"})
    }
 });
 module.exports=router;