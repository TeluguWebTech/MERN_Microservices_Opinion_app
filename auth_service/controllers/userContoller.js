
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.userRegister = async(req, res)=>{
    const {name, email, password} = req.body
    try {
        const userRecord = await User.findOne({email})
        if(userRecord){
            return res.status(401).json({msg:"email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name, email, password:hashedPassword
        })
        return res.status(201).json({msg:"user registered success"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
    }
}

exports.userLogin = async(req, res)=>{
        const {email, password} = req.body
        try {
            const record = await User.findOne({email})
            if(!record){
                return res.status(401).json({msg:"invalid credentials"})
            }
            const isMatch = await bcrypt.compare(password, record.password)
            if(!isMatch){
                return res.status(401).json({msg:"invalid credentials"})
            }
            const token = jwt.sign(
                {userId: record._id }, process.env.JWT_SECRET,
                {
                    expiresIn:"1d",
                    issuer:"auth-service",
                    audience:"op-share-api"
                }
            )

            return res.status(201).json({msg:"user login success", token, record})
        } catch (error) {
             console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
        }
}