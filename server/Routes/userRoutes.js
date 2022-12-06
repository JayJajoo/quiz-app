const {registerUser,loginUser} =require("../controller/userController") 
const router=require("express").Router()
router.post("/registerUser",registerUser)
router.post("/loginUser",loginUser)
module.exports=router