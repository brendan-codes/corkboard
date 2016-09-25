
$(".nav-list li a").removeClass("active");
$('nav').transit({top: '-65px'});
$('#scroll_down').click(function(){
  window.scrollTo(0, document.body.scrollHeight);
});
$('#scroll_up').click(function(){
  window.scrollTo(0, 0);
});
