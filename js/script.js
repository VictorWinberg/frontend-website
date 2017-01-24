$(document).ready(function() {
  var unit = ($(window).width() < 768) ? 'mobile' : 'browser';
  $('section').append('<p class="screen">Your screen width is: ' + $(window).width() + 'px. I think that you are a ' + unit + '!</p>');
  $('section').append('<p class="mouse"></p>');

  $(window).resize(function() {
    unit = ($(window).width() < 768) ? 'mobile' : 'browser';
    $('section p.screen').text('Your screen width is: ' + $(window).width() + 'px. Now I actually think you are a ' + unit + '! Stop changing! It makes me confused!');
  });

  $(document).on('mousemove', function(event) {
    $('section p.mouse').text("Your mouse i at x = " + event.pageX + " and y = " + event.pageY + ", isn't that just awesome!?" );
  });

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
        $('html').css('padding-top', '0px');
      }
    }
  }
}
