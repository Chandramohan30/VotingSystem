const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    id: String,
    name: String,
    college: String,
    votes: Number
},{collection:"participants"} )

const model=mongoose.model("participants",schema);
module.exports=model;
