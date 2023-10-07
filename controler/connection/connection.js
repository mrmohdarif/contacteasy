const mongoose=require('mongoose')

const options = {
    dbName: 'EasyContact' // Specify the database name here
  };
const connection=async()=>{
    try
    {
        mongoose.connect(process.env.dburl,options).then((res)=>{
            console.log("db connection is fine");
        }).catch((error)=>{
            console.error('Error connecting to MongoDB:', error);
        })
        
    }
    catch(err)
    {
        console.log(err);
    }
    

}
module.exports=connection