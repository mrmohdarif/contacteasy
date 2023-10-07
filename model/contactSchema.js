const mongoose=require('mongoose')
const {Schema,model}=mongoose
const contactSchema=new Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String
    },
    number:{
     type:String
    },
    personal:{
        type:String,
        lowercase: false
    },
    professional:{
        type:String,
        lowercase: false
    },
    auther:{
        type: Schema.Types.ObjectId,
        ref: 'registers'
    }

})
contactList=mongoose.model("contact",contactSchema)
module.exports=contactList
