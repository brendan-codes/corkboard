//create map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(37.615223, -122.389977),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });


// $('.search-submit').click(function(){

//   var data = $('#search-form').serialize();

//     $.post('/find_by_location', data, function(res){



        var currCenter = map.getCenter();

        // var infowindow = new google.maps.InfoWindow();

        var marker, i;


        var locations = [];
        var newcenter; 

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(37.615223, -122.389977),
            map: map
          });
        
      //create markers
        // for (i = 0; i < locations.length; i++) {
          // marker = new google.maps.Marker({
          //   position: new google.maps.LatLng(locations[i][0], locations[i][1]),
          //   map: map
          
        // }

        //event listener for infowindow
        //   google.maps.event.addListener(marker, 'click', (function(marker, i){
        //     return function() {

        //       infowindow.setContent(locations[i][2]);
        //       infowindow.open(map, marker);
        //     }
        //   })(marker, i));
        //   google.maps.event.trigger(map, 'resize');
        //     map.setCenter(currCenter);
        // }
        // console.log("hello there, new center", newcenter)
        // newLocation(newcenter.lat,newcenter.lng);

            // console.log(res);


// $("#recenter").on('click', function (){
//     newLocation(37.615223, -122.389977);
// });
