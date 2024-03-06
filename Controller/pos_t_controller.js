const { name } = require('ejs');
const user = require('../Models/user');
const post = require('../Models/post');



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






