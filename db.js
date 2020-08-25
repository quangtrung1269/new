const Pool = require("pg").Pool;
const pool =new Pool({
    user:"postgres",
    password:"Trung123",
    database:"qlsp",
    host:"localhost",
    port:"5432"
})
module.exports=pool;