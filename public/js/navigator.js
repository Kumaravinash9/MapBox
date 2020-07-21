mapboxgl.accessToken = 'pk.eyJ1IjoiZXJyb3I0MDciLCJhIjoiY2tjdHp3cGM5MjNzOTJybGhxa2F4OGwweCJ9.p2-LXrmjQGsXYT0jyIpx7g';
var map = new mapboxgl.Map({
container: 'map',
center:[77.2090,28.6139],
style: 'mapbox://styles/mapbox/streets-v11', 
zoom: 8,
});
var markers = new mapboxgl.Marker().setLngLat([77.2090,28.6139]).setPopup(new mapboxgl.Popup().setHTML("<p>New Delhi</p>")).addTo(map);


async function getRequest( url=" "){

var res= await fetch(url);
return await res.json();}


getRequest("http://localhost:5000/map").then((data)=>{
markers.remove();
console.log(data.latlngdata[0]);
markers = new mapboxgl.Marker().setLngLat([data.latlngdata[0].longitude,data.latlngdata[0].latitude]).setPopup(new mapboxgl.Popup().setHTML("<p>"+data.latlngdata[0].city+"</p>")).addTo(map);
map.on("load",function(){
map.flyTo({
center:[data.latlngdata[0].longitude,data.latlngdata[0].latitude],
essential:true,
})})})



map.addControl(
new MapboxDirections({
accessToken: mapboxgl.accessToken
}),
'top-left'
);


var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');