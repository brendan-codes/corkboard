

//add information from database for coordinates and names of people
var locations = [
  ['Cali', 37.615223, -122.389977, 4],
  ['More cali', 37.7694, -122.4862, 5],
  ['More stuff', 37.8199, -122.4783, 3],
];
//create map
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: new google.maps.LatLng(37.615223, -122.389977),
  mapTypeId: google.maps.MapTypeId.ROADMAP,

});

var currCenter = map.getCenter();

var infowindow = new google.maps.InfoWindow();

var marker, i;

//function to recenter map
function newLocation(newLat,newLng){
  map.setCenter({
    lat : newLat,
    lng : newLng
  });
}


//create markers
for (i = 0; i < locations.length; i++) {  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map
  });


//event listener for infowindow
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(locations[i][0]);
      infowindow.open(map, marker);
    }
  })(marker, i));
  google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
}

  $("#recenter").on('click', function (){
      newLocation(37.615223, -122.389977);
    });
