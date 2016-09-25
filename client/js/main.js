$(document).ready(function() {
  var view = 'index';

  $( "#navbar" ).load( "/views/partials/navbar.html", function(){
    $(".button-collapse").sideNav();
    $('#index_button').on('click', function(){
      $('#body').css('opacity', 0);
      view = 'index';
      updateView();
    });
    $('#make_note_button').on('click', function(){
      $('#body').css('opacity', 0);
      view = 'make_note';
      updateView();
    });
    $('#search_button').on('click', function(){
      $('#body').css('opacity', 0);
      view = 'search';
      updateView();
    });
    $('#map_button').on('click', function(){
      $('#body').css('opacity', 0);
      view = 'map';
      updateView();
    });
    // $('#about_button').on('click', function(){
    //   view = 'about';
    //   updateView();
    // });
  });

  updateView();
  function updateView(){
    switch (view) {
      case 'index':
        $( "#body" ).load( "/views/partials/index.html", function(){
          $(".nav-list li a").removeClass("active");
          $('nav').transit({top: '-65px'});
          $('#body').transition({opacity: 1});
          $('#scroll_down').click(function(){
            window.scrollTo(0, document.body.scrollHeight);
          });
          $('#scroll_up').click(function(){
            window.scrollTo(0, 0);
          });
          $('#body').on('click', '#make_note_button', function(){
            $('#body').css('opacity', 0);
            view = 'make_note';
            updateView();
          });
          $('#body').on('click', '#search_button', function(){
            $('#body').css('opacity', 0);
            view = 'search';
            updateView();
          });
          $('#body').on('click', '#map_button', function(){
            $('#body').css('opacity', 0);
            view = 'map';
            updateView();
          });
        });
        break;
      case 'search':
        $( "#body" ).load( "/views/partials/search.html", function(){
          $(".nav-list li a").removeClass("selected");
          $('#search_button').addClass('selected');
          $('nav').transit({top: '0px'});
          $('#body').transition({opacity: 1});
        });
        break;
      case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html", function(){
          $(".nav-list li a").removeClass("selected");
          $('#make_note_button').addClass('selected');
          $('nav').transit({top: '0px'});
          $('#body').transition({opacity: 1});
        });
        break;
      case 'map':
        $( "#body" ).load( "/views/partials/navbar.html", function(){
          $(".nav-list li a").removeClass("selected");
          $('#map_button').addClass('selected');
          $('#body').transition({opacity: 1});
        });
        break;
      // case 'about':
      //   $( "#body" ).load( "/views/partials/about.html", function(){
      //     $(".nav-list li a").removeClass("selected");
      //     $('#about_button').addClass('selected');
      //   });
      //   break;
      case 'view_note':
        $( "#body" ).load( "/views/partials/note.html");
        break;
      default: break;
    }
  }

});
