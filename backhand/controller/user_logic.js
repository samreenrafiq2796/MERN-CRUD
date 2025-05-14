let user = require("../collection/User")
let bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
require("dotenv").config()
let cyrpto = require("crypto")
let tp =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})
const jsonwebtoken = require('jsonwebtoken');

 let user_function={
    register: async function(req,res){
        try{
            let {name,email,password,gender,age} = req.body;
            let emailcheck = await user.findOne({email:email});
            if (emailcheck) {
                return res.status(409).json({msg:"Email Already Exist"})
            } else {
                let haspassword = bcrypt.hashSync(password,13)
            let user_data = new user({name,email,password:haspassword,gender,age});
            let save_data = await user_data.save();
            res.status(200).json({msg: "User registered successfully"});

            let mailop = {
                to:email,
                from:process.env.EMAIL_PASS,
                subject: "Registration Email",
                plain : name + " Your Account has been registered"
            }

            tp.sendMail(mailop, function(erro,res){
                if (erro) {
                    console.log(erro)
                } else {
                    console.log("Email Has been Sent")
                }
            })


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
    },
    login:async function(req,res){
        try {
            let {email , password} = req.body;
            let find_email=await user.findOne({email})
            if (!find_email) {
               return res.status(404).json({msg:"User Not found"});      
            }
            let pswd = bcrypt.compareSync(password,find_email.password);
          
            if (!pswd) {
              return  res.status(401).json({msg:"Password is invalid"});      
            }
            const token = jsonwebtoken.sign({id : user.id},"key",{expiresIn : "1h"})
            return res.status(200).json({token,user:{id:find_email.id,email:find_email.email}})
        } catch (error) {
        res.status(501).json({msg:error.message});
            
        }
    },
    forgotPassword : async function(req,res){
        try {
            let {email} = req.body;
            let find_email=await user.findOne({email})
            if (!find_email) {
               return res.status(404).json({msg:"User Not found"});      
            }
            // let resettoken = cyrpto.randomBytes(20).toString("hex")
            let token = jsonwebtoken.sign({id: find_email.id},"key" , {expiresIn:"15m"} )

            const resetlink = "http://localhost:3000/resetpswd/"+token

            let mailop = {
                to:email,
                from:process.env.EMAIL_PASS,
                subject: "Password Reset Link",
                text : " Click the link below : "+ resetlink
            }

            tp.sendMail(mailop, function(erro,res){
                if (erro) {
                    console.log(erro)
                } else {
                    console.log("Email Has been Sent")
                }
            })
        } catch (error) {
            console.log(error.message)
        res.status(501).json({msg:error.message});
            
        }
    },
    resetPassword:async function(req,res){
        try {
            let { token } = req.params;
            let { password } = req.body;

            let jwttoken = jsonwebtoken.decode(token,"key")
            let encryptpswd = bcrypt.hashSync(password,10);

            await user.findByIdAndUpdate(jwttoken.id,{password: encryptpswd});
            res.status(200).json({ message: 'Password reset successfully' });

        } catch (error) {
            console.log(error.message)
        res.status(501).json({msg:error.message});
        }
    }
 }
 module.exports=user_function;