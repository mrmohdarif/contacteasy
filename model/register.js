const mongoose = require('mongoose')
const { Schema,model } = mongoose
const registerSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique:[true,"This email already register"]
    },
    password: {
        type: String,
        required:true,
        unique:[true,"Enter Unique password"]
    },
    phone:{
        type:Number,
        required:true,
        unique:[true,"Enter Unique phone number"]
    }
})
// To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
const register=mongoose.model("register",registerSchema )
module.exports=register