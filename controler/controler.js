const user=require('../model/register')
const contact=require('../model/contactSchema')
const jwt=require('jsonwebtoken')
var CryptoJS = require("crypto-js");

const bcrypt=require('bcrypt')
const register=async(req,res)=>{

const {name,email,password,phone}=req.body
const salt=bcrypt.genSaltSync(10)
const haspassword=bcrypt.hashSync(password,salt)
const data={
name:name,
email:email,
password:password,
phone,phone
}
data.password=haspassword
const userRegistration=await user.create(data);
console.log(name,email,password);
res.send(userRegistration)
}
const login=async(req,res)=>{
    const{email,password}=req.body
    const data=await user.findOne({email:email})  
    const loadhas=bcrypt.compareSync(password,data.password)   
    if( loadhas)
    {
     const token=jwt.sign({payload:data._id,username:data.name},process.env.SECRET_KEY,{expiresIn:"24h"})
     res.send(token)
    }
}
const contacts=async(req,res)=>{
const {name,email,number,personal,professional,token}=req.body
// Encrypt
var name1 = CryptoJS.AES.encrypt(name, process.env.SECRET_KEY).toString();
var email1 = CryptoJS.AES.encrypt(email, process.env.SECRET_KEY).toString();
var number1 = CryptoJS.AES.encrypt(number, process.env.SECRET_KEY).toString();
var personal1 = CryptoJS.AES.encrypt(personal, process.env.SECRET_KEY).toString();
var professional1 = CryptoJS.AES.encrypt(professional, process.env.SECRET_KEY).toString();

const verify=jwt.verify(token,process.env.SECRET_KEY)

const data={
    name:name1,
    email:email1,
    number:number1,
    personal: personal1,
    professional:professional1,
    auther:verify.payload
}

const contactAuth=await contact.create(data)
 const arrayofData=[]
console.log(contactAuth);
  
const contactData=await contact.find({auther:verify.payload})

 contactData.forEach((value,index)=>{
 var bytesname  = CryptoJS.AES.decrypt(value.name, process.env.SECRET_KEY);
 var bytesemail  = CryptoJS.AES.decrypt(value.email, process.env.SECRET_KEY);
 var bytesnumber  = CryptoJS.AES.decrypt(value.number, process.env.SECRET_KEY);
 var bytespersonal  = CryptoJS.AES.decrypt(value.personal, process.env.SECRET_KEY);
 var bytesprofessional  = CryptoJS.AES.decrypt(value.professional, process.env.SECRET_KEY);


 //decrypt

  var originalTextbytesname = bytesname.toString(CryptoJS.enc.Utf8);
 var originalTextbytesemail = bytesemail.toString(CryptoJS.enc.Utf8);
 var originalTextbytesnumber = bytesnumber.toString(CryptoJS.enc.Utf8);
 var originalTextbytespersonal = bytespersonal.toString(CryptoJS.enc.Utf8);
 var originalTextbytesprofessional = bytesprofessional.toString(CryptoJS.enc.Utf8);
  const decryptData={
    name:originalTextbytesname,
    number:originalTextbytesnumber,
    email:originalTextbytesemail,
    personal:originalTextbytespersonal,
    professional:originalTextbytesprofessional,
    _id:value._id,
    auther:value.auther
 }

arrayofData.push(decryptData)

})
// console.log(arrayofData);
 res.send(arrayofData)
}
const profile=(req,res)=>{
const {token}=req.body
// console.log(token)
const verifToken=jwt.verify(token,process.env.SECRET_KEY)
// console.log(verifToken)
res.send(verifToken)
}
const logout=(req,res)=>{
 res.sendStatus(200)
}
const deleteContact=async(req,res)=>{
const {id}=req.params
console.log(id)
// const findUser=contact.findbyId(deletedUserId)
const deleteItem=await contact.deleteOne({'_id':id})
res.send({"message":"Contact delete sucessfully"})
}
const updateContact=async(req,res)=>{
 const {id}=req.params
 const data=await contact.findById
 const updateItem=await contact.updateOne()
}
const allData=async(req,res)=>{
    const {token}=req.body
    const allData=[]
    // console.log(token)
    const verify=jwt.verify(token,process.env.SECRET_KEY)
    // console.log(verify);
    const contactData=await contact.find({auther:verify.payload})
    // console.log("width auther and id",contactData,contactData.length)
    // console.log(contactData.length);
    contactData.forEach((value,index)=>{
        var bytesname  = CryptoJS.AES.decrypt(value.name, process.env.SECRET_KEY);
        var bytesemail  = CryptoJS.AES.decrypt(value.email, process.env.SECRET_KEY);
        var bytesnumber  = CryptoJS.AES.decrypt(value.number, process.env.SECRET_KEY);
        var bytespersonal  = CryptoJS.AES.decrypt(value.personal, process.env.SECRET_KEY);
        var bytesprofessional  = CryptoJS.AES.decrypt(value.professional, process.env.SECRET_KEY);
       
       
        //decrypt
       
         var originalTextbytesname = bytesname.toString(CryptoJS.enc.Utf8);
        var originalTextbytesemail = bytesemail.toString(CryptoJS.enc.Utf8);
        var originalTextbytesnumber = bytesnumber.toString(CryptoJS.enc.Utf8);
        var originalTextbytespersonal = bytespersonal.toString(CryptoJS.enc.Utf8);
        var originalTextbytesprofessional = bytesprofessional.toString(CryptoJS.enc.Utf8);
         const decryptData={
           name:originalTextbytesname,
           number:originalTextbytesnumber,
           email:originalTextbytesemail,
           personal:originalTextbytespersonal,
           professional:originalTextbytesprofessional,
           _id:value._id,
           auther:value.auther
        }
        allData.unshift(decryptData)
       })
       res.send(allData)

}
module.exports={register,login,contacts,profile,logout,deleteContact,updateContact,allData}