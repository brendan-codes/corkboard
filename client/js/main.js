$(document).ready(function() {
  var view = 'index';

  $( "#navbar" ).load( "/views/partials/navbar.html", function(){
    $.getScript('../js/navbar.js');
  });

  updateView();

  function updateView(){
    switch (view) {
      case 'index':
        $( "#body" ).load( "/views/partials/index.html", function(){
          $.getScript('../js/index.js');
        });
        break;
      case 'search':
        $( "#body" ).load( "/views/partials/search.html", function(){
          $.getScript('../js/search.js');
        });
        break;
      case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html", function(){
          $.getScript('../js/make_note.js');
        });
        break;
      case 'map':
        $( "#body" ).load( "/views/partials/navbar.html", function(){
          $.getScript('../js/mapview.js');
        });
        break;
      // case 'about':
      //   $( "#body" ).load( "/views/partials/about.html", function(){
      //     $.getScript('../js/about.js');
      //   });
      //   break;
      case 'view_note':
        $( "#body" ).load( "/views/partials/note.html");
        break;
      default: break;
    }
  }

});
