// =========================== Windows Scroller ===========================

$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load', () => {

    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');

    if ($(window).scrollTop() > 0) {
      $('.top').show();
    } else {
      $('.top').hide();
    }

    // Check if header is overlapping content
    var headerHeight = $('header').outerHeight();
    var mainOffset = $('main').offset().top;
    if (headerHeight > mainOffset) {
      $('header').css('z-index', '2');
      $('main').css('z-index', '1');
    } else {
      $('header').css('z-index', '1');
      $('main').css('z-index', '2');
    }

  });

  // Smooth Scrolling 
  $('a[href*="#"]').on('click', (event) => {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

});


// =========================== Text Typing ===========================

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {

    delta = this.period;
    this.isDeleting = true;

  } else if (this.isDeleting && this.txt === '') {

    this.isDeleting = false;
    this.loopNum++;
    delta = 200;

  }

  setTimeout(function () {

    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {

    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');

    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

// =========================== Technologies Skills Bar ===========================

$(document).ready(function () {

  $('.progress-bar').each(function () {
    $(this).find('.progress-content').animate({
      width: $(this).attr('data-percentage')
    }, 2000);

    $(this).find('.progress-number-mark').animate(
      { left: $(this).attr('data-percentage') }, {
      duration: 2000,
      step: function (now, fx) {
        var data = Math.round(now);
        $(this).find('.percent').html(data + '%');
      }
    });
  });
});

// =========================== Scroll to Top =========================== 

$(window).scroll(() => {

  if ($(this).scrollTop() >= 50) {

    $('#return-to-top').fadeIn(200);

  } else {

    $('#return-to-top').fadeOut(200);

  }

});

$('#return-to-top').click(() => {

  $('body,html').animate({

    scrollTop: 0

  }, 500);

});

