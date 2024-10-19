const mongoose=require('mongoose')

//create/prepare schema

const urlShema=new mongoose.Schema({
        shortId:{
            type:String,
            required:true,
            unique:true
        },
        redirectionUrl:{
            type:String,
            required:true
        },
        visitHistory:[
            {timestamp:{type:Number}}
        ]
    },
    {
        timestamps:true
    }
);

const URL=mongoose.model("url",urlShema)

module.exports=URL