$(document).ready(function() {
  var view = 'index';
  updateView();

  $( "#navbar" ).load( "/views/partials/navbar.html");

  $('#make_note_button').on('click', function(){
    view = 'make_note';
    updateView();
  });
  $('#search_button').on('click', function(){
    view = 'search';
    updateView();
  });
  $('#map_button').on('click', function(){
    view = 'map';
    updateView();
  });

  function updateView(){
    switch (view) {
      case 'index':
        $( "#body" ).load( "/views/partials/index.html", function(){
          $('#scroll_down').click(function(){
            window.scrollTo(0, document.body.scrollHeight);
          });
          $('#scroll_up').click(function(){
            window.scrollTo(0, 0);
          });
        });
        break;
      case 'search':
        $( "#body" ).load( "/views/partials/search.html");
        break;
      case 'view_note':
        $( "#body" ).load( "/views/partials/note.html");
        break;
      case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html");
        break;
      case 'map':
        $( "#body" ).load( "/views/partials/navbar.html");
        break;
      default:
    }
  }

  // $.get('/map', function(res){
  //   $('#main').html(res);
  // });
  // $.get('/findothers', function(res){
  //   $('#main').html(res);
  // });
  // $.get('/findme', function(res){
  //   $('#main').html(res);
  // });
  // $.get('/note', function(res){
  //   $('#main').html(res);
  // });
});
