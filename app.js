const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")
const app = express();

const items = [];        //just for making working of todo list and not messing up things we make an array
const workItems= [];    //yes we can make array const in js and push init const doent protect things inside it you just cant assign it to new array or object

app.set('view engine', 'ejs');                           //this is for ejs check documentation
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {


  let day = date.getDate();

  res.render("list", {  title: day,newListItems:items});//weare writing newListItem here for a reason and havent writted it in app.post where it belongs
                                                          //and have writted res.redirect instead of rendering

});
//res.render check the folders views and search for file lists having .ejs extension and then finds the ejs inspect
// in which we want to make changes and change it with thing after : i.e day


app.post("/",function(req,res){

let item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
   items.push(item);
   res.redirect("/");}
});


app.get("/work",function(req,res){
  res.render("list",{title:"Work List" ,newListItems: workItems});
});
// app.post("/work",function(req,res){
//
// });


app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("server has started on port 3000");
})
