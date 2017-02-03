$(document).ready(function() {
  $(document).on('mousemove', function(event) {devMode(event)});

  mobileNavbar();

  footerMarginFix();
});

function mobileNavbar () {
  var aboveHeight = $('header').outerHeight();

  $(window).scroll(function() { changeNavbar(); });
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('change');
    $('nav ul').toggleClass('is-visible');
    $('nav ul').children().one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() { changeNavbar(); });
  });

  function changeNavbar() {
    if($(window).width() < 768) {
      if($(window).scrollTop() > aboveHeight) {
        $('nav').addClass('fixed');
        $('header').css('display', 'none');
        $('html').css('padding-top', $('nav').outerHeight() + aboveHeight + 'px');
      }
      else {
        $('nav').removeClass('fixed');
        $('header').css('display', 'block');
        $('html').css('padding-top', '0px');
      }
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

function devMode(event) {
  $('footer').html("<b>Footer.</b> Mouse pos: x = " + event.pageX + ", y = " + event.pageY + ". Screen: width = " + $(window).width() + ", height = " + $(window).height() + ". Copyright (c) 2016 Copyright Holder All Rights Reserved.");
}
