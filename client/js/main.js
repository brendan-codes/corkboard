$(document).ready(function() {
  var notesArr = [];

  // load navbar
  $( "#navbar" ).load( "/views/partials/navbar.html", function(){
    $(".button-collapse").sideNav();
    $('#index_button').on('click',     function(){ loadView('index'); }     );
    $('#make_note_button').on('click', function(){ loadView('make_note'); } );
    $('#search_button').on('click',    function(){ loadView('search') ;}    );
    $('#map_button').on('click',       function(){ loadView('map'); }       );
    $('#about_button').on('click',     function(){ loadView('about'); }     );
  });

  // load index
  loadView('index');

  // routing function
  function loadView(view, post){
    // for transition
    $('#body').css('opacity', 0);
    // set nav for view
    activateView(view);
    // load correct view
    switch (view) {
      //########################   INDEX   #####################################
      case 'index':
        $( "#body" ).load( "/views/partials/index.html", function(){
          $('#body').transition({opacity: 1});

          // scroling
          $('#scroll_down').click(function(){
            window.scrollTo(0, document.body.scrollHeight);
          });
          $('#scroll_up').click(function(){
            window.scrollTo(0, 0);
          });

          // navigation
          $('#body').on('click', '#make_note_button',   function(){ loadView('make_note'); });
          $('#body').on('click', '#search_button',      function(){ loadView('search');    });
          $('#body').on('click', '#map_button',         function(){ loadView('map');       });
        });
        break;

        //########################   MAKE NOTE   #################################
        case 'make_note':
        $( "#body" ).load( "/views/partials/make_note.html", function(){
          $('#body').transition({opacity: 1});
          $.getScript("../js/make_note.js");

          // submit note
          $('.submit-make-note').click(function(){
            if (validateNote()){
              var data = $('form').serialize();
              $.ajax({
                url: '/notes/add',
                data: data,
                // contentType: false,
                type: 'POST',
                processData: false,
                dataType: 'json',
                success: function(note){
                  if (note){ loadView('view_note', note); }
                  else { swal({   title: "Server Error",   text: "Sorry there has been a proble",   type: "error",   confirmButtonText: "OK" }); }
                }
              });
            } else {
              swal({   title: "Input Error",   text: "Please fill out all fields marked with a *",   type: "error",   confirmButtonText: "OK" });
            }
          });

        });
        break;

      //########################   SEARCH   ####################################
      case 'search':
        $( "#body" ).load( "/views/partials/search.html", function(){
          $('#body').transition({opacity: 1});

          // search on enter
          $("#search").keypress(function(event) {
            if (event.which == 13) {
              event.preventDefault();
              $("#search").blur();
              $('#search-submit').click();
            }
          });

          // search validation
          $('#search').on('input', function(){
            if ($(this).val()){ $('#search').removeClass('invalid').addClass('valid'); }
            else { $('#search').removeClass('valid').addClass('invalid'); }
          });

          // search
          $('#search-submit').click(function(){
            var name = $('#search').val();
            if (name){
              $('#search').removeClass('invalid').addClass('valid');
              var data = {'name': name};
              $.post('/find_by_name', data, function(notes){
                notesArr = notes;

                $('#post-box').empty();
                $('#search-label').attr('data-success', notes.length+' results found');
                if (notes){ $('#post-box').removeClass('clear'); }
                else { ('#post-box').addClass('clear'); }

                for (var i in notes){
                  var post = "";
                  post += "<div class='col s12 m12'><div class='card horizontal'><div class='card-image fill'>";
                  post += "<img src="+ notes[i].image +" data='image/jpeg' charset='utf-8;base64' class='small_image'>";
                  post += "</div><div class='card-stacked'><div class='card-content'>";
                  post += "<h2 class='header no-top-margin'>"+ notes[i].name +"</h2>";
                  post += "<p>"+ notes[i].note +"</p>";
                  post += "<p>"+ notes[i].contact +"</p>";
                  post += "</div>";
                  post += "<div class='card-action notes_button' noteId='"+i+"'>";
                  post += "<a>View My Notes</a></div></div></div></div><hr>";

                  $('#post-box').append(post);
                }
              });
            } else {
              console.log('ya');
              $('#search').removeClass('valid').addClass('invalid')
            }
            return false;
          });

          // view note
          $('#body').on('click', '.notes_button', function(){
              $('#body').css('opacity', 0);
              noteId = $(this).attr('noteId');
              console.log(noteId);
              loadView('view_note', notesArr[noteId]);
          });
        });
        break;

      //###########################   MAP   ####################################
      case 'map':
        $( "#body" ).load( "/views/partials/map.html", function(){
          $('#body').transition({opacity: 1});
          $.getScript("../js/map.js");
        });
        break;

      //########################   VIEW NOTE   #################################
      case 'view_note':
        $( "#body" ).load( "/views/partials/note.html", function(){
          $('#body').transition({opacity: 1});
          $.getScript("../js/note.js");

          //==========================================================
          //                    SET NOTE DATA
          //==========================================================
          $('#image').attr('src', post.image);
          $('#name').text(post.name);
          $('#note').text(post.note);
          $('#contact').text(post.contact);


          //==========================================================
          //                        MAP
          //==========================================================
          $('#body').on('click','#location_button', function(){
            $('#map').toggleClass('clear', 1000, "swing");
            if ($('#map').hasClass('clear')){
              $('#location_button').text('Show Picture');
            } else {
              $('#location_button').text('Show Location');
            }
          });

        });
        break;

      //########################   ABOUT   ####################################
      case 'about':
        $( "#body" ).load( "/views/partials/about.html", function(){
          $('#body').transition({opacity: 1});
        });
        break;

      default: break;
    }
  }

  // sets the nav for view
  function activateView(view){
    $(".nav-list li a").removeClass("selected");
    if (view == 'index'){
      $('nav').transit({top: '-65px'});
    } else {
      $('nav').transit({top: '0px'});
      $('#'+view+'_button').addClass('selected');
    }
  }

});
