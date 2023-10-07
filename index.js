const express=require("express")
const app=express()
const router=require('./router/router')
const dbconnection=require('./controler/connection/connection')
const dotenv=require('dotenv')
const cors=require('cors')
app.use(cors({
    origin:"*"
}))
app.use(express.json())
dotenv.config()
app.use(router)
const PORT=process.env.PORT
dbconnection()
app.listen(PORT,()=>{
console.log(`you are running on ${PORT}`)
})
