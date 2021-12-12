const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.port || 8000;
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');

// const userRoutes = require("./user");
// app.use("/login",userRoutes);


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

 
const detailschema = new Schema({
  firstname: String,
  lastname: String,
  gender: String,
  tagline: String,
  summary: String,
  degree: String,
  college: String,
  startyear: String,
  endyear: String,
  domain: String,
  aboutdomain: String,
  title: String,
  company: String,
  startdate: String,
  enddate: String,
  aboutexperience: String,
  ptitle: String,
  aboutproject: String,
  email: String,
  linkedin:String,
  github:String,
  twitter:String,
  profile:String,
});
const detail = mongoose.model("detail",detailschema);
 

app.get("/" , (req ,res) => {
    res.sendFile(__dirname + "/frontpage.html");
  // res.send("hello");
    });
    app.get("/template" , (req ,res) => {
        res.sendFile(__dirname + "/templates.html");
      // res.send("hello");
        });
    app.get("/aboutus" , (req ,res) => {
        res.sendFile(__dirname + "/aboutus.html");
      // res.send("hello");
        });    

app.get("/details" , (req ,res) => {
    res.sendFile(__dirname + "/test1.html");
  // res.send("hello");
    });

    app.get("/template/:userId" , (req ,res) => { 
        const id = req.params.userId;
        detail.find({firstname: id}, (err,data)=>{
            
             console.log(data);
             res.render('dark',{room : data});
            //  console.log(room);
        
    
        });  
        
        });
        app.get("/template2/:userId" , (req ,res) => { 
          const id = req.params.userId;
          console.log(id);
          detail.find({ firstname: id}, (err,data)=>{
              
               console.log(data);
               res.render('dark2',{room : data});
               console.log(room);
          
      
          });  
          
          });

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",(req,res) =>{
    let newdetail = new detail({        
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        tagline:req.body.tagline,
        summary:req.body.summary,

        degree:req.body.degree,
        college:req.body.college,
        startyear:req.body.startyear,
        endyear:req.body.endyear,
        domain:req.body.domain,
        aboutdomain:req.body.aboutdomain,
        title:req.body.title,
        company:req.body.company,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        aboutexperience:req.body.aboutexperience,
        ptitle:req.body.ptitle,
        aboutproject:req.body.aboutproject,
        email:req.body.email,
        linkedin:req.body.linkedin,
        github:req.body.github,
        twitter:req.body.twitter,
        profile:req.body.profile,
        name:req.body.name1,
        password:req.body.password,
        
    });
    newdetail.save(); 
    res.redirect("http://localhost:8000/template");  


})




   




app.listen(port,() => {
    console.log(`listening to ${port}`)
})

//app.use(bodyParser.urlencoded({extended:true}));
