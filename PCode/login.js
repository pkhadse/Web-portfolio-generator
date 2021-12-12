const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.port || 3000;
const mongoose = require('mongoose');
const app = express();
// app.set('view engine', 'ejs');
//app.use(express.static())
 mongoose.connect('mongodb://localhost:27017/detail', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
    console.log(`connection success`);
}).catch((e)  => {
    console.log(`not succedd`);

})


const Schema = mongoose.Schema;

 
const loginschema = new Schema({
  name:String,
  email:String,
  password:String,
  confirmpassword:String
  
});
const login = mongoose.model("login",loginschema);

app.get("/register" , (req ,res) => {
     res.sendFile(__dirname + "/register.html");
    
//    res.send("hello");
    });
 
    app.use(bodyParser.urlencoded({extended:true}));   

    app.post("/register",(req,res) =>{
        let newlogin = new login({        
            name:req.body.name1,
            email:req.body.email,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword
         
        });
        newlogin.save();
        res.redirect("http://localhost:3000/login");  

    })   
    app.get("/login" , (req ,res) => {
        res.sendFile(__dirname + "/login.html");
       
   //    res.send("hello");
       });
    app.post("/login",(req,res) =>{
        
            email = req.body.email,
            password = req.body.password,
            
         console.log(email)

         login.findOne({email : email}, function(err , foundlogin){
             if (err){
                 console.log(err);
             }else {
                 if (foundlogin){
                     if (foundlogin.password === password){
                        // res.sendFile(__dirname + "/test1.html");
                        res.redirect('http://localhost:8000/details');
                     }
                 }
             }
         })
        

        


    });  


    app.listen(port,() => {
        console.log(`listening to ${port}`)
    });
    