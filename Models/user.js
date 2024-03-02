const mongoose=require('mongoose');

/* First, you define a schema that defines the structure of your documents. You can define this schema using the mongoose.Schema() constructor.*/

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
    ,
    name:{
        type:String,
        required:true,

    }
},{timestamps:true});/*n Mongoose, you can define schema paths for storing timestamps using the timestamps option. This option, 
when set to true, automatically adds createdAt and updatedAt fields to your schema, which store the creation and last update 
times respectively.*/

/*  When you create a document, Mongoose will set the createdAt and updatedAt fields to the current time.
When you update a document, Mongoose will update the updatedAt field to the current time.*/

/*Create a Model: Once you have defined the schema, you use mongoose.model() to create a Model based on that schema.
 You pass the name of the collection (in singular form) and the schema to mongoose.model().  */

const Users =mongoose.model('user',userSchema);

module.exports=Users;
