let user = require("../collection/User")
let bcrypt = require("bcrypt");

 let user_function={
    register: async function(req,res){
        try{
            let {name,email,password,gender,age} = req.body;
            let emailcheck =await user.findOne({email:email});
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
    },
    get_all_user:async function(req,res){
        try {
            let user_get = await user.find().select("-password").sort({record_at:-1});
            res.status(201).json(user_get)
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
    },
    delete_user  : async function(req,res){
       try {
        let {id} = req.params;
        let exist = await user.findById(id);

        if (!exist) {
            return res.status(404).json({msg :"User not Found"})
        }

        await user.findByIdAndDelete(id)
        res.status(201).json({msg:"User Deleted Successfully"})
       } catch (error) {
        res.status(501).json({msg:error.message});
       }
    }
    
 }
 module.exports=user_function;