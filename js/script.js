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
  var header = $('header').outerHeight();
  var nav = $('nav').outerHeight();

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
      if($(this).closest("nav").length) {
        offset -= 2 * header + nav;
      } else {
        offset -= nav;
      }
    }

    if(offset != 0) {
      // perform animated scrolling by getting top-position of target-element and set it as scroll target
      $('html, body').animate({
        scrollTop: scrollPos + offset },
        1000, function() {
          //attach the #jumptarget to the pageurl
          location.hash = target;
      });
      return false;
    }
  }
}

function mobileNavbar () {
  var aboveHeight = $('header').outerHeight();

  changeNavbar();
  $(window).resize(function() { changeNavbar(); });
  $(window).scroll(function() { changeNavbar(); });
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('change');
    $('nav ul').toggleClass('is-visible');
    $('nav ul').children().one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() { changeNavbar(); });
  });
  $('nav a').on('click', function(){
    $('.menu-icon').removeClass('change');
    $('nav ul').removeClass('is-visible');
    $('nav ul').children().one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() { changeNavbar(); });
  });

  function changeNavbar() {
    if($(window).width() < 768 && $(window).scrollTop() > aboveHeight) {
        $('nav').addClass('fixed');
        $('header').css('display', 'none');
        $('html').css('padding-top', $('nav').outerHeight() + aboveHeight + 'px');
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
