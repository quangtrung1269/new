const LoacalStrategy=require("passport-local").Strategy;
const pool=require("./db");
const bcrypt=require("bcrypt");

function initialize(passport)
{
    const autheticateUser = (email,password,done)=>{

        pool.query(
            "select * from users where email = $1",[email],(err,results)=>{
                if(err){
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0)
                {
                    const user =results.rows[0];

                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err){
                            throw err;
                        }
                        if(isMatch){
                            return done(null,user);
                        }else{
                            return done(null,false,{message:"Mật khẩu không đúng"});
                        }
                    });
                }else{
                    return done(null,false,{message:"Email không đúng"});
                }
            }
        );
    };

    passport.use(
        new LoacalStrategy({
            usernameField:"email",
            passwordField:"password"
        }, 
        autheticateUser
    )
    );
 

   
}

module.exports=initialize;