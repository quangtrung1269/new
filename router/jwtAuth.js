const router=require("express").Router();
const pool =require("../db");
router.post("/register"),async(req,res)=>{
    try {
        const {name, email,password}=req.body;
        const user= await pool.query("select * from users where email=$1",[email]);
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error");
    }
}

module.exports=router;