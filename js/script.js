$(document).ready(function() {
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('change');
    $('nav ul').toggleClass('is-visible');
  });
  mobileNavbar();
});

function mobileNavbar () {
  var aboveHeight = $('header').outerHeight();

  $(window).scroll(function(){
    if($(window).width() < 768) {
      if($(window).scrollTop() > aboveHeight) {
        var navHeight = $('nav').outerHeight();
        $('nav').addClass('fixed');
        $('html').css('padding-top', 0 + 'px');
      }
      else {
        $('nav').removeClass('fixed');
        $('html').css('padding-top', 0 + 'px');
      }
    }
  });
}
