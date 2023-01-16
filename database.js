
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ahsan:ahsan101010@cluster0.8fu8scl.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true})
mongoose.connection.on("connected",  ()=>{
    console.log("mongoose connected sucessfully");
})
mongoose.connection.on("disconnected",  ()=>{
    console.log("mongoose not connected sucessfully");
    process.exit(1);
})

var signUp = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    confirmPassword:String,

}); 


const stdModel = mongoose.model('signUpData',signUp);

module.exports = {stdModel:stdModel};
