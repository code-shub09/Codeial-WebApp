const mongoose=require('mongoose');

const CommentSchema=  new mongoose.Schema({
    
    content:{
        type:String,
        required:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    post:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

// creating model

const comments=mongoose.model('comment',CommentSchema);

module.exports=comments;