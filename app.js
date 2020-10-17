const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs'); //this is for ejs check documentation
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//if we are using any databse then we dont add items into array we are using mongodbin this project with the help of mongoose
//const items = [];        //just for making working of todo list and not messing up things we make an array
//const workItems= [];    //yes we can make array const in js and push init const doent protect things inside it you just cant assign it to new array or object

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// sChema

const {
  Schema
} = mongoose;
const itemsSchema = new Schema({
  name: String
});
// model based on schema
const Item = mongoose.model("Item", itemsSchema);
// basic items for user experience
const item1 = new Item({
  name: "welcome to your todo list."
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<- hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema={
  name:String,
  items: [itemsSchema]
};

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {
  let day = date.getDate();
  // mongoose find all
  Item.find({}, function(err, foundItems) {

    if (foundItems.lenght === 0) {
      // inserting data in our mongodb
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved  default items to db.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        title: day,
        newListItems: foundItems
      });
    }
  });

  //weare writing newListItem here for a reason and havent writted it in app.post where it belongs
  //and have writted res.redirect instead of rendering
});
//res.render check the folders views and search for file lists having .ejs extension and then finds the ejs inspect
// in which we want to make changes and change it with thing after : i.e day


app.get("/:customListName",function(req,res){
  const customListName = req.params.customListName;

 List.findOne({name: customListName},function(err,foundList){
   if(!err){
     if(!foundList){
       console.log("not exist");
     }else{"exist"};
   }
 })
  const list = new List({
    name:customListName,
    items:defaultItems
  });
  list.save();

});


app.post("/", function(req, res) {

  let itemName = req.body.newItem;
  let item = new Item({
    name: itemName
  });

  item.save();
  res.redirect("/");

});

app.post("/delete", function(req, res) {
  let checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log("Successfully deleted checked item");
      res.redirect("/");
    };

  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    title: "Work List",
    newListItems: workItems
  });
});
// app.post("/work",function(req,res){
//
// });


app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("server has started on port 3000");
})
