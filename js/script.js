$(document).ready(function() {
  smoothAnchorScroll();
  mobileNavbar();
  parallaxImages();
  footerMarginFix();

  debug();
});

function parallaxImages() {
  $('.parallax').each(function(i) {
    $(this).css('background-image', 'url("img/pattern' + (i+1) + '.jpg")');
  });
}

function smoothAnchorScroll() {
  var header = $('header').outerHeight();

  $('a[href*="#"]').on('click', scrollAnimation);
  $(window).resize(function() {
    $('a[href*="#"]').off('click', scrollAnimation);
    $('a[href*="#"]').on('click', scrollAnimation);
  });

  function scrollAnimation(e) {
    //prevent the default "hard" jump
    e.preventDefault();

    var scrollPos = $(window).scrollTop();
    var target = $(this).attr("href");
    var offset = target == '#' ? -scrollPos : $('a[id*=' + target.replace('#','') + ']').offset().top;

    if($(window).width() < 768) {
      offset -= $('nav').outerHeight();
    }

    if(offset != 0) {
      $('html, body').animate({
        scrollTop: scrollPos + offset },
        1000, function() {
          //attach #target to pageurl
          location.hash = target;
      });
      return false;
    }
  }
}

function mobileNavbar () {
  var aboveHeight = $('header').outerHeight();
  var navHeight = $('nav').outerHeight();

  $(window).resize(function() { changeNavbar(); });
  $(window).scroll(function() { changeNavbar(); });
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('cross');
    $('nav ul').toggleClass('is-visible');
  });
  $('nav a').on('click', function(){
    $('.menu-icon').removeClass('cross');
    $('nav ul').removeClass('is-visible');
  });

  changeNavbar();
  function changeNavbar() {
    if($(window).width() < 768 && $(window).scrollTop() > aboveHeight) {
        $('nav').addClass('fixed');
        $('header').css('display', 'none');
        $('html').css('padding-top', navHeight + aboveHeight + 'px');
      } else {
      $('nav').removeClass('fixed');
      $('header').css('display', 'block');
      $('html').css('padding-top', '0px');
    }
  }
}

function footerMarginFix() {
  var windowHeight = $(window).height();
  var newHeight = $('body').height() + $('footer').height();
  if(newHeight < windowHeight) {
    var margin = windowHeight - newHeight;
    $('footer').css('margin-top', margin + 'px');
  }
  $('footer').css('display', 'block').hide().fadeIn(500);
}

function debug() {
  $(document).on('mousemove', function(event) { mouseAndScreenInfo(event); });

  $(window).resize(function(event) { mouseAndScreenInfo(event); });

  function mouseAndScreenInfo(event) {
    $('footer').html("<b>Footer.</b> Mouse pos: x = " + event.pageX + ", y = " + event.pageY + ". Screen: width = " + $(window).width() + ", height = " + $(window).height() + ".<br>\&copy; " + new Date().getFullYear() + " Victor Winberg. All Rights Reserved.");
  }
}
