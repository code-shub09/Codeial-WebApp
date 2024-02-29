const express = require('express');

const app=express();
const port=4200;

app.listen(port,(err)=>{
    if(err){
        console.log(`error:${err}`);
    }

    console.log(`server is running on port No:${port}`);

});