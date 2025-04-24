let user = require("../collection/User")
 let user_function={
    register: async function(req,res){
        try{
            let user_data = new user(req.body);
            let save_data = await user_data.save();
            res.status(200).json({msg: "User registered successfully"});
            }catch(error){
                res.status(501).json({msg:error.message});
        }
    }
 }
 module.exports=user_function;