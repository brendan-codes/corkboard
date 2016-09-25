$(document).ready(function() {
  $.get('/map', function(res){
    $('#main').html(res);
  });
  $.get('/findothers', function(res){
    $('#main').html(res);
  });
  $.get('/findme', function(res){
    $('#main').html(res);
  });
  $.get('/note', function(res){
    $('#main').html(res);
  });
});
