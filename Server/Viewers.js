 const mongoose=require("mongoose");

 const schema=new mongoose.Schema({
    email:"String"
 },{collection:"Voters"})

 
 const vmodel=mongoose.model("Voters",schema);
 module.exports=vmodel;