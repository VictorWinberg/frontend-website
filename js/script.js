$(document).ready(function() {
  mobileNavbar();
});

function mobileNavbar () {
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('change');
    $('nav ul').toggleClass('is-visible');
    $('nav ul').children().one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() { changeNavbar(); });
  });

  var aboveHeight = $('header').outerHeight();
  var navHeight = $('nav').outerHeight();

  $(window).scroll(function() { changeNavbar(); });

  function changeNavbar() {
    if($(window).width() < 768) {
      if($(window).scrollTop() > aboveHeight) {
        navHeight = $('nav').outerHeight();
        $('nav').addClass('fixed');
        $('header').css('display', 'none');
        $('html').css('padding-top', navHeight + aboveHeight + 'px');
      }
      else {
        $('nav').removeClass('fixed');
        $('header').css('display', 'block');
        $('html').css('padding-top', 0 + 'px');
      }
    }
  }
}
