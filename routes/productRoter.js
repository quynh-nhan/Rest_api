var express = require("express");
var router= express.Router();
var productRouter=require("../model/Product");
var upload = require("../utils/Upload");
var sendMail= require("../utils/Mail");
// Post: them,Put: cap nhat,Delete:xoa,Get:lay
// them moi 1 sp
//  
 router.post("/add-product", async function(req,res){
    try{
        // nhan/lay du lieu
        const {name,description,price,quantity,status,cateID}=req.body;
        const createAt = new Date();
        const updateAt= new Date();
        // tao object luu db 
        const newProduct = {name,description,price,quantity,status,createAt,updateAt,cateID};

        // luu object vao db
        await productRouter.create(newProduct);
        res.status(200).json({status:true,message:"Thanh cong"});
    }catch(e){
        res.status(400).json({status:false,message:"khong thanh cong "+e});
    }
 });
 // sua 
 router.put("/update-product", async function(req,res){
    const{id,name,description,price,quantity,status,createAt,updateAt,cateID}= req.body;
    
        const item = await productRouter.findById(id);
        // const item2 = await productRouterr.find({_id:id})
        if(item){
            // update
            item.name= name ? name: item.name;
            item.description = description ? description : item.description;
            item.price = price ? price : item.price;
            item.quantity = quantity ? quantity : item.quantity;
            item.status = status ? status : item.status;
            item.updateAt =new Date();
            item.cateID = cateID ? cateID : item.cateID;
            await item.save();
            res.status(200).json({status:true,message:"cap nhat thanh cong"})
        }else{
            res.status(200).json({status:false,message:"Khong tim thay san pham"})
        }
 });
 // xoa 
 router.delete("/delete-product", async function (req,res) {
     const{id} = req.query;
     const item = await productRouter.findById(id);
     if(item){
         await productRouter.findByIdAndDelete(id);
          res.status(200).json({status:true,message:"xoa thanh cong"})
     }else{
         res.status(200).json({status:false,message:"Khong tim thay san pham"})
     }
  });
  // lay toan bo danh sach sp trong dtb
  router.get("/all", async function(req,res) {
    // const list = await productRouter.find({},"name description price").populate("cateID");
    // const list = await productRouter.find({$and :[{price:{$gt:20000}},{quantity:{$gt:10}}]});
    const list = await productRouter.find();
    res.status(200).json({status:true,message:"thanh cong",data:list})
  });

  // lab 4
//   Lọc danh sách sản phẩm có giá lớn hơn 50,000.
    router.get("/bai1", async function(req,res) {
        const list = await productRouter.find({price:{$gt:40000}})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lọc danh sách sản phẩm có số lượng nhỏ hơn 10.
    router.get("/bai1.2", async function(req,res) {
        const list = await productRouter.find({quantity:{$lt:40}})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm sản phẩm có name chứa từ khóa “socola”.
    router.get("/bai1.3", async function(req,res) {
        const list = await productRouter.find( {name: { $regex: "socola", $options: "i" }})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Sắp xếp sản phẩm theo giá tăng dần.
    router.get("/bai1.4", async function(req,res) {
        const list = await productRouter.find().sort({price:1})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy 3 sản phẩm có giá cao nhất.
    router.get("/bai1.5", async function(req,res) {
        const list = await productRouter.find().sort({price:-1}).limit(3);
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy 5 sản phẩm có số lượng nhiều nhất.
    router.get("/bai1.6", async function(req,res) {
        const list = await productRouter.find().sort({quantity:-1}).limit(5);
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm được tạo trong ngày hôm nay (dựa vào createAt).
    router.get("/bai1.7", async function(req,res) {
       const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999)
        const list = await productRouter.find({createAt: {$gte: start, $lte: end}})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lọc sản phẩm có giá nằm trong khoảng từ 20,000 đến 100,000.
    router.get("/bai1.8", async function(req,res) {
        const list = await productRouter.find({price:{$gt:20000 , $lt:100000}});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm có tên bắt đầu bằng chữ “Bánh”.
    router.get("/bai1.9", async function(req,res) {
        const list = await productRouter.find( {name: { $regex: "Bánh", $options: "i" }})
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm sản phẩm theo nhiều điều kiện: giá < 100,000 và quantity > 20.
    router.get("/bai1.10", async function(req,res) {
        const list = await productRouter.find({$and :[{price:{$lt:100000}},{quantity:{$gt:20}}]});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm có giá < 100,000 và status = true, đồng thời sắp xếp theo giá giảm dần.
    router.get("/bai1.11", async function(req,res) {
        const list = await productRouter.find({$and :[{price:{$lt:100000}},{status:true}]}).sort({price:-1});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy sản phẩm có quantity nằm trong khoảng từ 10 đến 30 và name chứa từ “bánh”.
    router.get("/bai1.12", async function(req,res) {
        const list = await productRouter.find({$and :[{quantity:{$gt:10,$lt:30}},{name:{$regex: "bánh", $options: 'i' }}]});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm sản phẩm theo nhiều điều kiện: name chứa “kem” hoặc “socola”, và giá > 200,000.
    router.get("/bai1.13", async function(req,res) {
        const list = await productRouter.find({
            $and :[
                {$or: [
                    {name:{$regex: "kem", $options: 'i'}},
                    {name:{$regex: "socola", $options: 'i'}}
                ]},
                    {price:{$gt:20000}}
                ]});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm có quantity > 20, sắp xếp theo quantity giảm dần, sau đó theo price tăng dần.
    router.get("/bai1.14", async function(req,res) {
        const list = await productRouter.find({
            quantity:{$gt:20}}).sort({quantity:-1}).sort({price:1});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm theo cateID nhưng loại bỏ các sản phẩm có status = false
    router.get("/bai1.15", async function(req,res) {
        const cateID = req.query.cateID;
        const list = await productRouter.find({
           cateID:cateID,
            status: { $nin: [false] }
        });
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm sản phẩm có price thấp nhất trong toàn bộ danh sách.
        router.get("/bai1.16", async function(req,res) {
        const list = await productRouter.find().sort({price:1}).limit(1);
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm 5 sản phẩm có price cao nhất nhưng quantity phải lớn hơn 10.
            router.get("/bai1.17", async function(req,res) {
        const list = await productRouter.find(
            {quantity:{$gt:10}}).sort({price:-1}).limit(5);
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm tất cả sản phẩm có name bắt đầu bằng chữ “Bánh” và description chứa từ “vani”.
    router.get("/bai1.18", async function(req,res) {
        const list = await productRouter.find({$and:[
            {name:{$regex: "Bánh", $options: 'i' }},
            {description:{$regex: "socola", $options: 'i' }}
        ]});
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lọc danh sách sản phẩm tạo trong vòng 7 ngày trở lại đây dựa vào createAt.
    router.get("/bai1.19", async function(req,res) {
        const today= new Date();
        const svdayago=(today.getDate()-20);
        const list = await productRouter.find({
            createAt:{$gt:svdayago,$lt:today}
        }
        );
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Lấy danh sách sản phẩm theo cateID, và chỉ trả về các field: name, price, quantity.
    router.get("/bai1.20", async function(req,res) {
        const cateID = req.query.cateID;
       const list = await productRouter.find({cateID:cateID},"name price quantity");
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });
// Tìm sản phẩm có price từ 20,000 đến 200,000 và name KHÔNG chứa chữ “socola”.
        router.get("/bai1.21", async function(req,res) {
       const list = await productRouter.find(
           {
            $and:[
                {price:{$gt:20000,$lt:200000}},
                {name:{$not:{$regex: "socola", $options: 'i'}}}
            ]
           }
        );
        res.status(200).json({status:true,message:"thanh cong",data:list})
    });

    router.post('/upload', [upload.single('hinhAnh')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

    router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
               return res.json({ status: 0, link : [] }); 
            } else {
              const url = [];
              for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
              }
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : [] });
        }
    });

    router.post("/send-mail", async function (req, res, next) {
  try {
    const { to, subject, content } = req.body;

    const htmlContent = `
      <div style="margin:0; padding:0; background:#f0f2f5; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.15);">
          
          <!-- HEADER -->
          <div style="background:linear-gradient(135deg, #6a11cb, #2575fc); padding:25px; text-align:center;">
            <h1 style="color:#fff; margin:0; font-size:26px;">📩 THÔNG BÁO MỚI</h1>
            <p style="color:#e0e0e0; margin-top:8px;">Hệ thống tự động gửi mail</p>
          </div>

          <!-- BODY -->
          <div style="padding:35px; color:#333;">
            <h2 style="margin-top:0;">Xin chào bạn 👋</h2>
            
            <p style="font-size:16px; line-height:1.7;">
              Bạn vừa nhận được một thông báo mới 
            </p>

            <div style="margin:25px 0; padding:20px; background:#f7f9ff; border-radius:8px; border:1px dashed #2575fc;">
              <p style="margin:0; font-size:16px; color:#444;">
                ${content || "Nội dung thông báo sẽ hiển thị tại đây."}
              </p>
            </div>

            <div style="text-align:center; margin-top:35px;">
              <a href="https://google.com"
                style="display:inline-block; padding:14px 30px; background:linear-gradient(135deg,#6a11cb,#2575fc); color:#fff; text-decoration:none; border-radius:30px; font-size:16px; font-weight:bold;">
                🔎 XEM CHI TIẾT
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background:#f1f1f1; padding:18px; text-align:center; font-size:13px; color:#777;">
            <p style="margin:0;">© 2025 Hệ Thống </p>
          </div>

        </div>
      </div>
    `;

    const mailOptions = {
      from: "abc <havatar123@gmail.com>",
      to: to,
      subject: subject,
      html: htmlContent
    };

    await sendMail.transporter.sendMail(mailOptions);

    res.json({ status: 1, message: "Gửi mail thành công" });

  } catch (err) {
    console.log("Lỗi gửi mail:", err);
    res.json({ status: 0, message: "Gửi mail thất bại" });
  }
});

module.exports = router;


  module.exports=router;
