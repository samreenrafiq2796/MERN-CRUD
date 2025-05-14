let exp = require("express")
let r = exp.Router()
let user_logic = require("../controller/user_logic")

r.post("/user", user_logic.register);
r.post("/login", user_logic.login);
r.get("/user",user_logic.get_all_user);
r.delete("/user/:id",user_logic.delete_user)
r.post("/forgotpswd",user_logic.forgotPassword)
r.post("/resetpswd/:token",user_logic.resetPassword)
module.exports= r;