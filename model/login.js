const mongoose=require('mongoose')
const {Schema,model}=mongoose
const loginSchema=new Schema({
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }
})

const login=mongoose.model(loginSchema)
module.exports=login