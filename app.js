var express  = require("express"),
 path        = require("path"),
 geocoder    = require("./Routes/GeoJson"),
 bodyParser  = require("body-parser"),
 dotenv      = require("dotenv"),
 cat         = require("cat-me"),
 app         = express();

  

 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());
 dotenv.config({
  path:"./config/config.env"
});
 app.use(express.static("public"));
 
/********************ROUTES*****************/

var data;

 app.get("/",function(req,res){
 res.render("map")});


 app.post("/", async (req,res,next)=>{
 data  = await geocoder.geocode(req.body);
 res.json({
 latlngdata:data,
 })});
 
//This Route send the Json data to navigator.ejs 

 app.get("/map",function(req,res){
 res.json({
 latlngdata:data,
 })})


 app.get("/navigator",function(req,res){
 res.render("navigator");});

/*********************PORT ****************/

const PORT = process.env.PORT||5000;

app.listen(PORT,function(){
  console.log(cat());
})