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
