import { Map,GoogleApiWrapper } from 'google-maps-react';
import inputField from '../InputAttribute/inputData.json';


let userAddress = 
$.ajax({
  url:"http://maps.googleapis.com/maps/api/geocode/json?address="+userAddress+"&sensor=false",
  type: "POST",
  success:function(res){
     let lat = res.results[0].geometry.location.lat;
     let lng = res.results[0].geometry.location.lng;
  }
});