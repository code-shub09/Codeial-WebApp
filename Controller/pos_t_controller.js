const { name } = require('ejs');
const user = require('../Models/user');
const post = require('../Models/post');

const commenT=require('../Models/comments');



module.exports.posT = function (req, res) {
    if (req.isAuthenticated()) {
        post.create({
            content: req.body.content,
            user: req.user._id
        }).then((post)=>{
            return res.redirect('back');
        })     
    } else{
        return res.redirect('/user/sign-in');
    }
};


module.exports.comment=((req,res)=>{
    
    if(req.isAuthenticated()){
        post.findById(req.body.post)
        .then((pos_t)=>{
            commenT.create({
                content:req.body.comment,
                user:req.user._id,
                post:req.body.post
            }).then((comment_)=>{
                post.comments.push(comment_);
                post.save();
               return res.redirect('/');
            }).catch((err)=>{
                console.log(err);
            })
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    
})





