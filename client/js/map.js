//create map
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: new google.maps.LatLng(37.615223, -122.389977),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

var currCenter = map.getCenter();

var infowindow = new google.maps.InfoWindow();

var marker, i;

$('.search-submit').click(function(){

  var data = $('#search-form').serialize();

    $.post('/find_by_location', data, function(res){

        var locations = [];

        for(var i=0; i<res.length; i++){
          x = [res[i].lat, res[i].long, res[i].name]
          locations.push(x)
          console.log(locations)
        }

        function newLocation(newLat,newLng){
          map.setCenter({
            lat : newLat,
            lng : newLng
          });
        };

      //create markers
        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            map: map
          });

        //event listener for infowindow
          google.maps.event.addListener(marker, 'click', (function(marker, i){
            return function() {

              infowindow.setContent(locations[i][2]);
              infowindow.open(map, marker);
            }
          })(marker, i));
          google.maps.event.trigger(map, 'resize');
            map.setCenter(currCenter);
        }

            // console.log(res);
      });
    return false;
    })

$("#recenter").on('click', function (){
    newLocation(37.615223, -122.389977);
});

