$(document).ready(function() {
  $(document).on('mousemove', function(event) { mouseAndScreenInfo(event); });

  smoothAnchorScroll();
  mobileNavbar();
  parallaxImages();
  footerMarginFix();
});

function mouseAndScreenInfo(event) {
  $('footer').html("<b>Footer.</b> Mouse pos: x = " + event.pageX + ", y = " + event.pageY + ". Screen: width = " + $(window).width() + ", height = " + $(window).height() + ". Copyright (c) 2016 Copyright Holder All Rights Reserved.");
}

function parallaxImages() {
  $('.parallax').each(function(i) {
    $(this).css('background-image', 'url("img/pattern' + (i+1) + '.jpg")');
  });
}

function smoothAnchorScroll() {
  $('a[href*="#"]:not([href="#"])').click(function() {
   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
     if (target.length) {
       $('html, body').animate({
         scrollTop: target.offset().top
       }, 1000);
       return false;
     }
   }
 });
}

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
