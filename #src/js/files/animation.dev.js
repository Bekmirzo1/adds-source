"use strict";

$(document).ready(function () {
  _animation.init();

  _run.init();
});
var _run = {
  init: function init() {
    _run.initAnimation();
  },
  initAnimation: function initAnimation() {
    var track = $('.js-track-width');
    var lasso = $('.js-lasso');
    var cat = $('.js-cat-width');
    var width__track = $('.cat-animation__item').width() - track.width() - cat.width() + 200 + 15;
    var setToStartAnimation = gsap.timeline();
    var setToFinishAnimation = gsap.timeline();
    var setLasso = gsap.timeline();
    setLasso.set(lasso, {
      opacity: 0,
      width: 0,
      duration: 2
    }, 2).from(lasso, {
      ease: Power1.easeOut,
      opacity: 0,
      duration: 2
    }).to(lasso, {
      width: 800,
      ease: Power1.easeOut,
      opacity: 1,
      duration: 2
    });
    setToStartAnimation.from(track, {
      ease: Power1.easeOut,
      x: 0,
      duration: 3
    }).to(track, {
      x: -width__track,
      duration: 3
    });
  }
};
var _animation = {
  init: function init() {
    _animation.catAnimation();
  },
  catAnimation: function catAnimation() {
    var item = $('.js-animation-item');
    var width__cat = item.width();
    var width__item = $('.fullscreen__cat').width() - width__cat;
    var setToStartAnimation = gsap.timeline();
    var setToFinishAnimation = gsap.timeline();

    function startAnimation() {
      setToStartAnimation.from(item, {
        ease: Power1.easeOut,
        x: 0,
        duration: 3
      }).to(item, {
        x: -width__item,
        duration: 3,
        onStart: function onStart() {
          //wheel
          var wheels = $(".cat-wheel"),
              tl = new TimelineMax({
            repeat: -1
          });
          tl.to(wheels, 2, {
            rotation: -360,
            transformOrigin: 'center center',
            ease: 'linear'
          }); //hand

          var hand = $(".js-cat-hand"),
              tl2 = new TimelineMax({
            repeat: 1
          });
          tl2.to(hand, 1, {
            transformOrigin: 'center center',
            ease: 'linear'
          }); //eye

          var eye = $(".js-cat-eye"),
              tl2 = new TimelineMax({
            repeat: 1
          });
          tl2.to(eye, 1.5, {
            scale: .7,
            repeat: 1,
            transformOrigin: 'center center',
            ease: 'linear'
          }); //line

          var hand = $(".js-cat-line"),
              tl2 = new TimelineMax({
            repeat: 2
          });
          tl2.to(hand, 2.5, {
            repeat: 1,
            transform: "translateX(40px)",
            ease: 'linear'
          }); //rools

          var rools = $(".js-cat-rools"),
              tl3 = new TimelineMax({
            repeat: -1,
            yoyo: true
          });
          tl3.fromTo(rools, 0.9, {
            ease: Power0.easeNone,
            y: 10
          }, {
            ease: Power0.easeNone,
            y: -10
          });
          tl3.fromTo(rools, 0.9, {
            ease: Power0.easeNone,
            y: -10
          }, {
            ease: Power0.easeNone,
            y: 10
          }); //rools

          var hand_2 = $(".js-cat-hand-2"),
              tl4 = new TimelineMax({
            repeat: -1,
            yoyo: true
          });
          tl4.fromTo(hand_2, 0.9, {
            ease: Power0.easeNone,
            y: 10
          }, {
            ease: Power0.easeNone,
            y: -10
          });
          tl4.fromTo(hand_2, 0.9, {
            ease: Power0.easeNone,
            y: -10
          }, {
            ease: Power0.easeNone,
            y: 10
          });
        },
        onComplete: function onComplete() {
          FinishAnimation();
          item.addClass('is-scale');
        }
      });
    }

    function FinishAnimation() {
      setToFinishAnimation.from(item, {
        x: -width__item,
        duration: 3
      }).to(item, {
        x: 0,
        duration: 3,
        onComplete: function onComplete() {
          startAnimation();
          item.removeClass('is-scale');
        }
      });
    }

    startAnimation();
  }
};