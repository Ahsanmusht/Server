

var express = require("express");
var fs = require("fs")
var http = require("http")
var color = require("colors")
// var UserModelStd = require("./app")
var cors = require("cors")
var {stdModel} = require("./database");
var app = express();
var bodyParser = require("body-parser");
const path = require("path");
// class 1


var port =process.env.SECRET || 3000;

app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(bodyParser.json());

    // front end connection link
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))))
    // front end connection link

app.post('/signUp', (req, res, next) => {

    // if (!req.body.stdName
    //     || !req.body.email
    //     || !req.body.rollNumber
    //     || !req.body.phoneNumber
    //     || !req.body.id) {
    //     res.status(405).send(`
    //     please send complete information
    //     e.g:
    //     {
    //         "name": "xyz",
    //         "email": "xyz@gmail.com",
    //         "password": "1234",
    //         "phone": "01312314",
    //         "id":2
    //     }`);
    //     return
    // };

    stdModel.findOne({email:req.body.email}, (err, data) =>{
        if(!err && !data){
            // console.log(data)
            var NewUsers = new stdModel({
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "password": req.body.password,
                "confirmPassword":req.body.confirmPassword
            });
            NewUsers.save((err, data) => {
                if (!err) {
                    console.log(data)
                    res.status(200).send({
                        message: "User Data Found",
                        
        
                    })
                    // console.log("user Not Found")
                } else {
                    console.log("==>>", err)
                    res.status(405).send({
                        message: "user creation faild"
                    })
                };
        
            })

            
        }else{
            console.log("DEKH K DALO TUM PAHLY SE MOOJOOD HO")
            res.status(404).send({
                message : "user already exist"
            })
        }
    })


});

app.post("/login", (req, res, next) => {

//   if(!req.body.Name || !req.body.email) {
//     res.status(404).send({
//         message: "wrong email"
//     })
    stdModel.findOne({email:req.body.email}, (err, data)=>{
        if(!err){
            if(data.email === req.body.email && data.password===req.body.password){
                res.status(200).send({
                    message:"login sucess",
                    data:data
    
                })
                return;
            }else{
                res.send({
                    message:"ur password is wrong"
                })
            }
            }else{
          
                res.status(404).send({
                    message:"not found"
                })

          
        }
    })
//   }
 })

app.listen(port, () => {
    console.log("server is running on", port)
})