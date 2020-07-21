     mapboxgl.accessToken = 'pk.eyJ1IjoiZXJyb3I0MDciLCJhIjoiY2tjdHp3cGM5MjNzOTJybGhxa2F4OGwweCJ9.p2-LXrmjQGsXYT0jyIpx7g';
     var map = new mapboxgl.Map({
     container: 'map',
     center:[77.2090,28.6139],
     style: 'mapbox://styles/mapbox/streets-v11', 
     zoom: 8,
     });


     if('geolocation'in navigator){
     navigator.geolocation.getCurrentPosition(async position  => {
     console.log(position);
     var data = await position.coords;
     var marker = new mapboxgl.Marker().setLngLat([77.2090,28.6139]).setPopup(new mapboxgl.Popup().setHTML("<p>your Location!</p>")).addTo(map);
     marker.setLngLat([data.longitude,data.latitude]);
     map.on('load',function(){
     map.flyTo({
     center: [data.longitude ,data.latitude],zoom:8,
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
    return response.json();
    }



    document.querySelector("input").addEventListener("input",function(e){
    this.addEventListener("keypress", function(e){
    if(e.code=="Enter")
    { var values=this.value;
    postData('http://localhost:5000/', { address:values})
    .then(data => {
    console.log(data.latlngdata); 
   markers = new mapboxgl.Marker().setLngLat([data.latlngdata[0].longitude,data.latlngdata[0].latitude]).setPopup(new mapboxgl.Popup().setHTML("<p>"+data.latlngdata[0].city+"</p>")).addTo(map);
    map.flyTo({
    center:[
    data.latlngdata[0].longitude,data.latlngdata[0].latitude],
    essential:true, }) });
    this.value=" ";}}
    )});