$(document).ready(function() {
  var view = 'index';
  updateView();

  $( "#navbar" ).load( "/views/partials/navbar.html", function(){
      $(".button-collapse").sideNav();
      $('#index_button').on('click', function(){
        view = 'index';
        updateView();
      });
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
      // $('#about_button').on('click', function(){
      //   view = 'about';
      //   updateView();
      // });
  });

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
          $.getScript('../js/map.js');
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
