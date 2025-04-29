let user = require("../collection/User")
let bcrypt = require("bcrypt");

 let user_function={
    register: async function(req,res){
        try{
            let {name,email,password,gender,age} = req.body;
            let emailcheck = user.findOne({email:email});
            if (emailcheck) {
                return res.status(409).json({msg:"Email Already Exist"})
            } else {
                let haspassword = bcrypt.hashSync(password,13)
            let user_data = new user({name,email,password:haspassword,gender,age});
            let save_data = await user_data.save();
            res.status(200).json({msg: "User registered successfully"});
            }
            }catch(error){
                res.status(501).json({msg:error.message});
        }
    }
    
 }
 module.exports=user_function;