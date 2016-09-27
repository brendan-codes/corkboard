//==========================================================
//                        LOCATION
//==========================================================
var lat, long, geolocation;
navigator.geolocation.getCurrentPosition(function(location) {
  // console.log(location.coords.latitude);
  // console.log(location.coords.longitude);
  // console.log(location.coords.accuracy);
  if (location.coords.latitude && location.coords.longitude){
    lat = location.coords.latitude;
    long = location.coords.longitude;

    // address lookup
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results) {
          geolocation = results[0].formatted_address;
          $('#location').val(geolocation);
          $('#location').removeClass('invalid').addClass('valid').removeAttr('disabled').change();
          enableLocationInput();
        } else {
          window.alert('No loction found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    // end - address lookup

    // $('#location').hide();
    // $('.remove-label').hide();
  }
}, function(){ enableLocationInput(); });

function enableLocationInput(){
  $("#location").removeAttr('disabled');
  $('#loading').attr('src', 'imgs/geolocation.png');
  $('#loading').removeAttr('onmouseover').removeAttr('onmouseout');
  // $('#location-label').css('margin-left', 130);
}
//==========================================================
//                        AUTO COMPLETE
//==========================================================
var input = document.getElementById('location');
var autocomplete = new google.maps.places.Autocomplete(input);
$('#location').attr('placeholder', '');

autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    console.log("Error: Autocomplete's returned place contains no geometry");
    return;
  } else {
    $('#location').addClass('valid');
    lat = place.geometry.location.lat();
    long = place.geometry.location.lng();
    console.log(lat, long);
  }
});

//==========================================================
//                        FORM CLICK
//==========================================================
$('#name').click(function(){
  $('#name').attr('placeholder', 'your name or the name of the person you are looking for');
});
$('#age').click(function(){
  $('#age').attr('placeholder', 'your age or the age of the person you are looking for');
});
$('#location').click(function(){
  $('#location').attr('placeholder', 'enter your location');
});
$('#contact').click(function(){
  $('#contact').attr('placeholder', 'list as many means of contact as you wish');
});
$('#note').click(function(){
  $('#note').attr('placeholder', 'enter a message to your loved one, including further location details or additional details on how to contact you');
});
$('#file-path').click(function(){
  $('#file-path').blur();
  $('#file-upload').click();
});

// loading
$('#loading').on('click', function(){
  if ($(this).attr('src') == 'imgs/geolocation.png'){
    $('#location').val(geolocation).removeClass('invalid').addClass('valid')
  } else {
    enableLocationInput();
  }
});



//==========================================================
//                        VALIDATION
//==========================================================
function isValid(element){
  var name = $(element).val();
  if (name){ $(element).removeClass('invalid').addClass('valid'); return true; }
  else { $(element).removeClass('valid').addClass('invalid'); return false; }
}

function validateNote(){
  var name = isValid($('#name'));
  var contact = isValid($('#contact'));
  var location = isValid($('#location'));
  var note = isValid($('#note'));
  return name && contact && location && note;
}

$('#name').on('input', function(){ isValid($(this)); });
$('#contact').on('input', function(){ isValid($(this)); });
$('#location').on('input', function(){ isValid($(this)); });
$('#note').on('input', function(){ isValid($(this)); });
