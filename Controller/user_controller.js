const { name } = require('ejs');
const user =require('../Models/user');

// here user represent the collection of users


module.exports.profile=function(req,res){
    // res.send('<h1>user profile </h1>');
    res.render('profile',{
        title:'User Profile'
    });

}

module.exports.SignUp=function(req,res){
    res.render('user_signUp',{
        title:'Codeial| SignUp'
    })
}

module.exports.SignIn=function(req,res){
    res.render('user_signIn',{
        title:'Codeial | SignIn'
    })
}


// get the sign-up data
module.exports.Create=function(req,res){
    // todo later

    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
   
    // query to collection or models based on email
   user.findOne({email:req.body.email})
   .then((data)=>{
     if(!data){ /* if user is not there */
        user.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        }).then((data)=>{

            // as new user is created now he can sign in to the application
            return res.redirect('/user/sign-in');
        }).catch((err)=>{
            console.log(err);
        })
     }else{
        // this email already exist ,so sign up agian
        res.redirect('back');
     }
   })
   .catch((err)=>{
    console.log(err,'there is error');
   })
}


// sign in and create the session for the user
module.exports.session=function(req,res){
    //todo later
}