const express=require("express");
const app = express();
const pool=require("./db");
const { select } = require("async");
const bcrypt=require("bcrypt");
const { result } = require("lodash");
const session=require("express-session");
const flash=require("express-flash");
const { Router } = require("express");
const cors=require("cors");

app.use(express.json());
app.use(cors());
//Routes//
//getallQLSP
app.get("/product",async (req,res)=>{
try {
    const allProduct=await pool.query("select * from product");
    res.json(allProduct.rows);
} catch (err) {
    console.log(err.message);    
}
});

//getproduct

app.get("/product/:id",async(req,res)=>{

    const{id}=req.params;
    try {
        const product=await pool.query("select * from product where id=$1",[id])
        res.json(product.rows[0])
    } catch (err) 
    {
        console.log(err.message);
    }
});
//createSQLP

app.post("/product", async(req,res)=>{
    try{
        const{nameproduct}=req.body;
        const{category}=req.body;
        const{img}=req.body;
        const{description}=req.body;
        const{origin}=req.body;
        const{price}=req.body;
        const{datecreate}=req.body;
        const newProduct=await pool.query("insert into product (nameproduct,category,img,description,origin,price,datecreate) values($1,$2,$3,$4,$5,$6,$7) returning *" ,
        [nameproduct,category,img,description,origin,price,datecreate]
        );
        res.json(newProduct.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//update

app.put("/product/:id" , async(req,res)=>{
try {
    const {id}=req.params;
    const{nameproduct}=req.body;
    const{category}=req.body;
    const{img}=req.body;
    const{description}=req.body;
    const{origin}=req.body;
    const{price}=req.body;
    const{datecreate}=req.body;
    const updatename= await pool.query("update product set nameproduct =$1 where id=$2",[nameproduct,id]);
    const updatecategory= await pool.query("update product set category =$1 where id=$2",[category,id]);
    const updateimg= await pool.query("update product set img =$1 where id=$2",[img,id]);
    const updatedescription= await pool.query("update product set description =$1 where id=$2",[description,id]);
    const updateorigin= await pool.query("update product set origin =$1 where id=$2",[origin,id]);
    const updateprice= await pool.query("update product set price =$1 where id=$2",[price,id]);
    const updatecreatedate= await pool.query("update product set datecreate =$1 where id=$2",[datecreate,id]);
    res.json("Product was update!!");

} catch (err) 
{
console.log(err.message);    
}
})

//delete
app.delete("/product/:id",async(req,res)=>
{
    try {
        const{id}=req.params;

const deleteproduct=await pool.query("delete from product where id=$1",
[id]
);
 res.json("Product was bay màu!!");
        
    } catch (err) {
        console.log(err.message);
        
    }
});

//Category

app.get("/category",async(req,res)=>
{
    try {
        const allCategory=await pool.query("select * from category");
        res.json(allCategory.rows);
        
    } catch (err) {
        console.log(err.message)
    }
})

app.get("/category/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const category=await pool.query("select * from category where id=$1",[id]);
        res.json(category.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.post("/category", async(req,res)=>{
    try{

        const{nameCategory}=req.body;
        const newCategory=await pool.query("insert into category (nameCategory) values($1) returning *" ,
        [nameCategory]
        );

        res.json(newCategory.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});
app.delete("/category/:id",async(req,res)=>
{
    try {
        const{id}=req.params;
const deletecategory=await pool.query("delete from category where id=$1",
[id]
);
 res.json("Category was bay màu!!");        
    } catch (err) {
        console.log(err.message);        
    }
});
app.put("/category/:id" , async(req,res)=>{
    try {
        const {id}=req.params;
        const{nameCategory}=req.body;
        const updateCategory= await pool.query("update category set nameCategory =$1 where id=$2",[nameCategory,id]);
        res.json("Category was update!!");    
    } catch (err) 
    {
    console.log(err.message);    
    }
    });

//Customer

app.get("/customer",async(req,res)=>
{
    try {
        const allCategory=await pool.query("select * from customer");
        res.json(allCategory.rows);
        
    } catch (err) {
        console.log(err.message)
    }
})

app.get("/customer/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const category=await pool.query("select * from customer where id=$1",[id]);
        res.json(category.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.post("/customer",async(req,res)=>
{
    try 
    {
    const {fullname}=req.body;
    const{username}=req.body;
    const{address}=req.body;
    const{phone}=req.body;
    const addCustomer =await pool.query("insert into customer(fullname,address,phone,username) values($1,$2,$3,$4) returning *",[fullname,address,phone,username]);
    res.json(addCustomer.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.put("/customer/:id",async(req,res)=>
{
try {
    const {id}=req.params;
    const {fullname}=req.body;
    const{username}=req.body;
    const{address}=req.body;
    const{phone}=req.body;
    const updateFullname = await pool.query("update customer set fullname =$1 where id=$2",[fullname,id])
    const updateusername = await pool.query("update customer set username =$1 where id=$2",[username,id])
    const updateaddress = await pool.query("update customer set address =$1 where id=$2",[address,id])
    const updatephone = await pool.query("update customer set phone =$1 where id=$2",[phone,id])
    res.json("Customer was update!!!");
} catch (err) {
    console.log(err.message);
}
});

app.delete("/customer/:id",async(req,res)=>
{
    try {
        const{id}=req.params;
const deletecategory=await pool.query("delete from customer where id=$1",
[id]
);
 res.json("Category was bay màu!!");        
    } catch (err) {
        console.log(err.message);        
    }
});


//User
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
    })
);
app.use(flash());

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
res.render("register");
});

app.get("/Login",(req,res)=>{
    res.render("Login");
});

app.get("/dashboard",(req,res)=>{
    res.render("dashboard",{user:"Trung"});
});

app.post("/register", async(req,res)=>
{
    let{name,email,password,password2}=req.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors= [];

    if(!name || !email || !password || !password2)
    {
        errors.push({message:"Không thể bỏ trống thông tin!"});
    }
    if(password.length<6)
    {
        errors.push({message: "Mật khẩu phải có ít nhất 6 ký tự!"});
    }
    if(password!=password2)
    {
        errors.push({message:"Mật khẩu không trùng khớp!"});
    }
    if(errors.length>0)
    {
        res.render("register",{errors});
    } else{
        let hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);

        pool.query("select * from Users where email = $1",[email],(err,results)=>
        {
            if(err){
                throw err;
            }
            console.log(results.rows);

            if(results.rows.length>0)
            {
                errors.push({message:"Tài khoản này đã tồn tại"})
                res.render("register",{errors});
            } else
            {
                pool.query("insert into users(fullname,email,passwords) values($1,$2,$3) returning *",[name,email,hashedPassword],
                (err,results)=>
                {
                    if(err){
                        throw err;
                    }
                    console.log(results.rows);
                    req.flash("success_msg","Bạn đã đăng ký, mời đăng nhập.");
                    res.redirect("login");
                })
            }
        });
    }
});
app.use("/auth",require("./router/jwtAuth"));

app.get("/staff",async(req,res)=>{
    try {
        const allStaff=await pool.query("Select * from staff")
        res.json(allStaff.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/staff/:id" ,async(req,res)=>{
    try {
        const {id}=req.params;
        const staff=await pool.query("select * from staff where id = $1",[id])
        res.json(staff.rows)
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/staff/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        const { fullname } = req.body;
        const { email } = req.body;
        const { phone } = req.body;
        const { address } = req.body;
        const { dateofbirth } = req.body;
        const updateFullname = await pool.query("update staff set fullname =$1 where id=$2", [fullname, id])
        const updateemail = await pool.query("update staff set email =$1 where id=$2", [email, id])
        const updateaddress = await pool.query("update staff set address =$1 where id=$2", [address, id])
        const updatephone = await pool.query("update staff set phone =$1 where id=$2", [phone, id])
        const updatedate = await pool.query("update staff set dateofbirth =$1 where id=$2", [dateofbirth, id])
        res.json("Nhân viên đã được update");
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/staff",async(req,res)=>{
try {
    const {fullname}=req.body;
    const {email}=req.body;
    const{phone}=req.body;
    const {address} = req.body;
    const {dateofbirth} = req.body;
    const newStaff= await pool.query("insert into staff(fullname,email,phone,address,dateofbirth) values ($1,$2,$3,$4,$5) returning *",[fullname,email,phone,address,dateofbirth]);
    res.json(newStaff.rows[0]);
} catch (err) {
    console.error(err.message);
    
}
});

app.delete("/staff/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        const daleteStaff=await pool.query("delete from staff where id=$1",[id]);
        res.json("Staff is bay màu");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000,()=>{
    console.log("5 lốp nhé babe");
});