
const express = require("express")
const dotEnv = require("dotenv")
const {createProxyMiddleware} = require("http-proxy-middleware")
const cors = require("cors")

const app = express()
dotEnv.config()

const PORT = process.env.PORT || 8000

app.use(cors())
// auth service
app.use(createProxyMiddleware({
    pathFilter:(path)=>
        path.startsWith("/admin") || path.startsWith("/user"),
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin:true
}))
// topic service
app.use(createProxyMiddleware({
    pathFilter:(path)=>
        path.startsWith("/topic") ,
    target: process.env.TOPIC_SERVICE_URL,
    changeOrigin:true
}))
// op service
app.use(createProxyMiddleware({
    pathFilter:(path)=>
        path.startsWith("/opinion"),
    target: process.env.OPINION_SERVICE_URL,
    changeOrigin:true
}))

app.listen(PORT,()=>{
    console.log(`API gateway running on ${PORT}`)
})