$(document).ready(function() {
  smoothAnchorScroll();
  mobileNavbar();
  parallaxImages();
  footerMarginFix();

  debug();

  $('html').promise().done(function() {
    $('html').addClass('loaded');
  });
});

loadScript("js/parallax.js", function() {
  // Done loading
});

function parallaxImages() {
  $('.parallax').each(function(i) {
    if($(this).hasClass('layers')) {
      if($(window).width() < 768) {
        var div = this;
        var url = "img/parallax/parallax-" + (i+1) + ".png";
        var img = new Image();
        img.onload = function() {
          // (img-height / img-width * container-width)
          var height = this.height / this.width * $(window).width();
          $(div).css('padding-top', height + 'px');
          $(div).css('background-image', 'url("' + url + '")');
        }
        img.src = url;
      } else {
        $(this).css('height', $(window).height() - $('.upper-container').outerHeight() + 'px');
        $(this).children('.layer').each(function(j) {
          $(this).css('background-image', 'url("img/parallax/parallax-' + (i+1) + '/' + j + '.png")');
        });
      }
    } else {
      $(this).css('background-image', 'url("img/parallax/parallax-' + (i+1) + '.png")');
    }
  });
}

function smoothAnchorScroll() {
  $('a[href*="#"]').on('click', scrollAnimation);

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
        400, function() {
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

  $(window).resize(function() {
    aboveHeight = $('header').outerHeight();
    navHeight = $('nav').outerHeight();
    changeNavbar();
  });
  $(window).scroll(function() { changeNavbar(); });
  $('.menu-icon').on('click', function(){
    $('.menu-icon').toggleClass('cross');
    $('nav ul').toggleClass('is-visible')
  });
  $('nav a').on('click', function(){
    $('.menu-icon').removeClass('cross');
    $('nav ul').removeClass('is-visible');
  });

  changeNavbar();
  function changeNavbar() {
    if($(window).width() < 768 && $(window).scrollTop() > aboveHeight) {
        $('nav').addClass('fixed');
        $('html').css('padding-top', navHeight + 'px');
      } else {
        $('nav').removeClass('fixed');
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

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
