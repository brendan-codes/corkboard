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
  });


  // $('#about_button').on('click', function(){
  //   view = 'about';
  //   updateView();
  // });

  function updateView(){
    switch (view) {
      case 'index':
        $( "#body" ).load( "/views/partials/index.html", function(){
          $('#scroll_down').click(function(){
            window.scrollTo(0, document.body.scrollHeight);
          });
        });
        break;
      case 'search':
        $( "#body" ).load( "/views/partials/search.html", function(){
          $(".nav-list li a").removeClass("active");
          $('#search_button').addClass('active');
        });
        break;
      case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html", function(){
          $(".nav-list li a").removeClass("active");
          $('#make_note_button').addClass('active');
        });
        break;
      case 'map':
        $( "#body" ).load( "/views/partials/navbar.html", function(){
          $(".nav-list li a").removeClass("active");
          $('#map_button').addClass('active');
        });
        break;
      // case 'about':
      //   $( "#body" ).load( "/views/partials/about.html", function(){
      //     $(".nav-list li a").removeClass("active");
      //     $('#about_button').addClass('active');
      //   });
      //   break;
      case 'view_note':
        $( "#body" ).load( "/views/partials/note.html");
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
