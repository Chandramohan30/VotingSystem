const express=require("express");
const app=express();
const model=require("./models.js");
const mongoose=require("mongoose");
const vmodel=require("./Viewers.js");
mongoose.connect("mongodb://127.0.0.1:27017/VegCarvingList");

const cors=require("cors");
app.use(cors());

const body=require("body-parser");
app.use(body.json());

app.get("/",(req,res)=>{
    model.find({}).then((participant)=>{
        res.json(participant);
    }).catch((error)=>{console.log(error)} )
})

app.post("/post",(req,res)=>{     
      const {name}=req.body;
      model.find({"name":name}).then((person)=>{
       res.json(person);
      }).catch((err)=>{console.log(err)});
})
app.post("/check",(req,res)=>{
    const {email,name}=req.body;
    vmodel.findOne({"email":email}).then(async (voter)=>{
          if(voter){
            res.json("Already voted");
          }
          else{
            res.json("Thanks for voting");
            await vmodel.create({ email: email });
            await model.findOneAndUpdate(
                { name: name }, // Assuming the item is identified by name
                { $inc: { votes: 1 } }, // Increment vote count by 1
                { new: true } // Return the updated document
            );
           

           
            
          }
    })

})

app.listen(5000,()=>{
    console.log("Server is running");
})


