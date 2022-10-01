import express from "express"
import shopRouter from "./shop.routers.js"

const PORT = process.env.PORT || 8080



function bootstrap(){
const app = express()
app.use(express.json())
app.use(shopRouter)
app.get("",(req,resp)=>{
    resp.statusCode = 401
resp.json("oki")
})
app.listen(PORT,()=>{
    console.log(`server start on port:${PORT}`);
})

}
bootstrap()