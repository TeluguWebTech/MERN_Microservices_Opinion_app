
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.adminRegister = async(req, res)=>{
    const {name, email, password} = req.body
    try {
        const adminRecord = await Admin.findOne({email})
        if(adminRecord){
            return res.status(401).json({msg:"email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await Admin.create({
            name, email, password:hashedPassword
        })
        return res.status(201).json({msg:"admin registered success"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
    }
}

exports.adminLogin = async(req, res)=>{
        const {email, password} = req.body
        try {
            const record = await Admin.findOne({email})
            if(!record){
                return res.status(401).json({msg:"invalid credentials"})
            }
            const isMatch = await bcrypt.compare(password, record.password)
            if(!isMatch){
                return res.status(401).json({msg:"invalid credentials"})
            }
            const token = jwt.sign(
                {adminId: record._id }, process.env.JWT_SECRET,
                {
                    expiresIn:"1d",
                    issuer:"auth-service",
                    audience:"op-share-api"
                }
            )

            return res.status(201).json({msg:"admn login success", token})
        } catch (error) {
             console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
        }
}