const express = require('express');

const app=express();
const port=4200;
const path=require('path');

const expressLayouts= require('express-ejs-layouts');


// using expressLayouts before the routes
app.use(express.static('./assests'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




/* Mount Router Middleware: Uses app.use() to mount the router middleware defined in the ./routes/index.js file. 
This means that any requests received by the server will be passed through the routes defined in the index.js router module. */


app.use('/',require('./routes/index'))
app.listen(port,(err)=>{
    if(err){
        console.log(`error:${err}`);
    }

    console.log(`server is running on port No:${port}`);

});