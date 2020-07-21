mapboxgl.accessToken = 'pk.eyJ1IjoiZXJyb3I0MDciLCJhIjoiY2tjdHp3cGM5MjNzOTJybGhxa2F4OGwweCJ9.p2-LXrmjQGsXYT0jyIpx7g';
var map = new mapboxgl.Map({
container: 'map',
center:[77.2090,28.6139],
style: 'mapbox://styles/mapbox/streets-v11', 
zoom: 8,
});

var markers = new mapboxgl.Marker().setLngLat([77.2090,28.6139]).setPopup(new mapboxgl.Popup().setHTML("<p>New Delhi</p>")).addTo(map);

var currentlocation;
if('geolocation'in navigator){
navigator.geolocation.getCurrentPosition(async position  => {
console.log(position);
 currentlocation = await position.coords;
var marker = new mapboxgl.Marker().setLngLat([77.2090,28.6139]).addTo(map);
marker.remove();
marker=new mapboxgl.Marker().setLngLat([currentlocation.longitude,currentlocation.latitude]).addTo(map);
map.on('load',function(){
map.flyTo({
center: [currentlocation.longitude ,currentlocation.latitude],zoom:8,
essential: true 
});})})}
else
{
alert("permit the location for getting ur own location!");
}




async function postData(url = '', data = {}) {
const response = await fetch(url, {
method: 'POST', 
mode: 'cors', 
cache: 'no-cache', 
credentials: 'same-origin', 
headers: {
 'Content-Type': 'application/json'
},
body: JSON.stringify(data)
});
return  await response.json();
}



document.querySelector("input").addEventListener("input",function(e){
this.addEventListener("keypress",function(e){
if(e.code==="Enter"||e.code==="Tab")
{    var values=this.value;
this.value=" ";
postData("http://localhost:5000/", { address:values})
.then(data => {
   if(data.latlngdata[0].latitude!=39.390897)
  
{console.log(data.latlngdata[0].latitude); 
   var start = [currentlocation.longitude,currentlocation.latitude];
 var end = [data.latlngdata[0].longitude,data.latlngdata[0].latitude];
   markers.remove();
markers = new mapboxgl.Marker().setLngLat([data.latlngdata[0].longitude,data.latlngdata[0].latitude]).setPopup(new mapboxgl.Popup().setHTML("<p>"+data.latlngdata[0].city+"</p>")).addTo(map);
var isAtStart = true;
var target = isAtStart ? end : start;
 isAtStart = !isAtStart; 
map.flyTo({
center:[
data.latlngdata[0].longitude,data.latlngdata[0].latitude],
essential:true,
speed: 1.2, 
curve: 1, 

// This can be any easing function: it takes a number between
// 0 and 1 and returns another number between 0 and 1.
easing: function(t) {
 return t;}


}) }})
}
}
)});





var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');