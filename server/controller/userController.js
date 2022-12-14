const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")

module.exports.registerUser = async (req, res) => {
    const { email, password, relation, regno } = req.body;
    const data = await userModel.find({ email })
    const hashedPassword=await bcrypt.hash(password,10)
    const user = {
        email: email,
        password: hashedPassword,
        relation: relation,
        regno: regno
    }
    if (data.length > 0) {
        res.json({
            success: false,
            msg: "User with same email already registered"
        })
    }
    else {
        if (await userModel.create(user)) {
            res.json({
                success: true,
                details: {
                    _id:data._id,
                    regno: regno,
                    email: email,
                    relation: relation
                }
            })
        }
    }
}
module.exports.loginUser = async (req, res) => {
    const { email, password, relation} = req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    const data = await userModel.findOne({ email,hashedPassword,relation})
    if (data) {
        res.json({
            success: true,
            details: {
                _id:data._id,
                regno:data.regno,
                email: email,
                relation: relation
            }
        })
    }
    else {
        res.json({
            success: false,
            msg: "Wrong credentials entered"
        })
    }
}