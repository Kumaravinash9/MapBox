NodeGeocoder = require("node-geocoder");

const options = {
    provider: "mapquest",
    apiKey: 'vlh2iAPxZbnvyGTHjr03bGiWwPuns1SY', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
 
  const geocoder = NodeGeocoder(options);

  module.exports=geocoder;