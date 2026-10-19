

const jwt = require("jsonwebtoken")

exports.userMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No Token /Wrong token" })
    }

    const token = authHeaders.split(" ")[1]
    try {
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET,
            {
                issuer:"auth-service",
                audience:"op-share-api",
                algorithms:"HS256"
            }
        )
        req.user = decoded
        next()
    } catch (error) {
             console.log(error.message)
        return res.status(500).json({msg:"something wrong"})
    }
}