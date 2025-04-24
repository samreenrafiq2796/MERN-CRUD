let exp = require("express")
let r = exp.Router()
let user_logic = require("../controller/user_logic")

r.post("/user", user_logic.register);

module.exports= r;