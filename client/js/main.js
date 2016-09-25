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
          $('#scroll_down').click(function(){
            window.scrollTo(0, document.body.scrollHeight);
          });
          $('#scroll_up').click(function(){
            window.scrollTo(0, 0);
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
        break;
      case 'search':
        $( "#body" ).load( "/views/partials/search.html", function(){
          $(".nav-list li a").removeClass("selected");
          $('#search_button').addClass('selected');
        });
        break;
      case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html", function(){
          $(".nav-list li a").removeClass("selected");
          $('#make_note_button').addClass('selected');
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
          $('.submit-make-note').click(function(){
            var details = $('form').serialize();
            $.post('/notes/add)', details, function(res){
              console.log(res);
            })
          });
        });
        break;
      case 'map':
        $( "#body" ).load( "/views/partials/map.html", function(){
          $(".nav-list li a").removeClass("active");
          $('#map_button').addClass('active');
          $.getScript("../js/map.js");
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
      default:
    }
  }
});
