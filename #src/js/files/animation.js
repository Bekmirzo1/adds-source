$(document).ready(function () {
  _runCat.init();
  _coinAnimation.init();
  console.clear();
});

const state = {
  boxWidth: $('.cat-animation__box').width(),
  offer: {
    track: $('.js-track'),
    lasso: $('.js-lasso'),
    cat: $('.js-cat'),
    word: $('.js-word')
  },
  coin: {
    item: $('.js-animation-item'),
    cat: $('.fullscreen__cat'),
    coin_1: $('.js-coins-1'),
    coin_2: $('.js-coins-2'),
    coin_3: $('.js-coins-3'),
    coin_4: $('.js-coins-4'),
    coin_5: $('.js-coins-5'),
    coin_6: $('.js-coins-6'),
    coin_7: $('.js-coins-7'),
    coin_8: $('.js-coins-8'),
  }
}

const _coinAnimation = {
  init: () => {
    _coinAnimation.catAnimation();
  },
  catAnimation: () => {
    let widthСat = state.coin.item.width();
    let widthItem = state.coin.cat.width() - widthСat;

    const setToStartAnimation = gsap.timeline();
    const setToFinishAnimation = gsap.timeline();

    const moveItems = () => {
      //wheel
      var wheels = $(".cat-wheel"),
        tl = new TimelineMax({
          repeat: -1
        });
      tl.to(wheels, 2, {
        rotation: -360,
        transformOrigin: 'center center',
        ease: 'linear'
      });
      //hand
      var hand = $(".js-cat-hand"),
        tl2 = new TimelineMax({
          repeat: 1,
          y: 10
        });
        tl2.to(hand, 1, {
          transformOrigin: 'center center',
          ease: Elastic.easeNone,
          y: -10,
      });
      //eye

      var eye = $(".js-cat-eye"),
      eye_2 = $(".js-cat-eye-2");
        var tl2 = new TimelineMax({
          repeat: 0,
        });

       var tl1 = new TimelineMax({
          repeat: -1,
        });

      tl2.from(eye, {
        autoAlpha: 1,
        visibility:"visible",
        ease: Elastic.easeOut
      });
      
      tl2.to(eye, {
        duration: 1.5,
        visibility:"hidden",
        autoAlpha: 0,
        ease: Elastic.easeOut,
      });
      
      tl1.from(eye_2, {
        autoAlpha: 0,
        duration: 2,
        y: 0,
        ease: Elastic.easeOut,
      });
      
      tl1.to(eye_2, {
        duration: 1.5,
        autoAlpha: 1,
        y: -4,
        ease: Elastic.easeOut,
      });


      //line
      var hand = $(".js-cat-line"),
        tl2 = new TimelineMax({
          repeat: 2
        });
      tl2.to(hand, 2.5, {
        repeat: 1,
        transform: "translateX(40px)",
        ease: 'linear'
      });
      //rools
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
      });
      //rools
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
    }

    const coinMove = () =>{
      var controller = new ScrollMagic.Controller();
      var tl = new TimelineMax();
      tl
        .to(state.coin.coin_6,{
          opacity: 1,
          ease: Elastic.easeOut,
        })
        .to(state.coin.coin_5,{
          opacity: 1,
          ease: Power3.easeOut,
        },3)
        .to(state.coin.coin_4,{
          opacity: 1,
          ease: Power3.easeOut,
        },5)
        .to(state.coin.coin_8,{
          opacity: 1,
          ease: Power3.easeOut,
        },4)
        .to(state.coin.coin_7,{
          opacity: 1,
          ease: Power3.easeOut,
        },6)
        .to(state.coin.coin_2,{
          opacity: 1,
          ease: Power3.easeOut,
        },6)
        .to(state.coin.coin_3,{
          opacity: 1,
          ease: Power3.easeOut,
        },11)
        .to(state.coin.coin_1,{
          opacity: 1,
          ease: Power3.easeOut,
        },12)
      var scene = new ScrollMagic.Scene({
        })
        .setTween(tl)
        .addTo(controller);
    }

    const isStart = () => {
      var controller = new ScrollMagic.Controller();
      var tl = new TimelineMax();
      tl
        .from(state.coin.item, {
          x: 0,
        })
        .to(state.coin.item, {
          x: -widthItem,
          ease: Power3.easeOut(1),
          duration: 3,
          onStart: () => {
            coinMove();
          },
          onComplete: () => {
            isFinish();
            state.coin.item.addClass('is-scale');
          }
        });

      var scene = new ScrollMagic.Scene({
          triggerElement: ".fullscreen ",
          reverse: true,
        })
        .setTween(tl)
        .addTo(controller);
    }
    moveItems();
    isStart();

    const isFinish = () => {
      setToFinishAnimation
        .from(state.coin.item, {
          x: -widthItem,
        })
        .to(state.coin.item, {
          x: 0,
          ease: Power3.easeOut(1),
          duration: 3,
          onComplete: () => {
            isStart();
            state.coin.item.removeClass('is-scale');
          }
        });
    }
  }
}


const _runCat = {
  init: () => {
    _runCat.initAnimation();
  },
  initAnimation: () => {
    // width screen
    var widthScreen = state.boxWidth - state.offer.track.width() - state.offer.cat.width();

    // init gsap timeline 
    const setLasso = gsap.timeline();
    const setWord = gsap.timeline();
    const seToStartTrackAnimation = gsap.timeline();
    const setCatFace = gsap.timeline();

    const widthLasso = state.boxWidth - state.offer.cat.width() - state.offer.track.width() + 40;


    //set laso
    setLasso
      .set(state.offer.lasso, {
        opacity: 0,
        width: 0,
      })
    //set word
    setWord
      .set(state.offer.word, {
        opacity: 0,
        y: 20,
      })


    // begin lasso
    const isLasso = () => {
      setLasso
        .to(state.offer.lasso, {
          width: widthLasso,
          ease: Elastic.easeOut,
          duration: 1.5,
          opacity: 1,
        })
        .from(state.offer.word, {
          opacity: 0,
        })
        .to(state.offer.word, {
          width: widthLasso,
          y: 0,
          opacity: 1,
          onComplete: () => {
            setTimeout(() => {
              isWordFinish();
              
            },800);
            setTimeout(() => {
              isTruckFinish();
              isLassoFinish();
            }, 2400);
          }
        })
    }
    // finish lasso 
    const isLassoFinish = () => {
      setLasso
        .to(state.offer.lasso, {
          ease: Power3.easeOut,
          duration: 2,
          opacity: 0,
          width: '100px',
          onComplete: () => {
            setCatFace
              .to(state.offer.catFace, {
                ease: Back.easeOut,
                fill: 'black',
                duration: 3,
              });

          }
        })
    }
    // start truck
    const isTruck = () => {
      
      var controller = new ScrollMagic.Controller();
      var tl = new TimelineMax();
      tl.to(state.offer.track, {
        ease: Power4.easeOut,
        duration: 2,
        x: -widthScreen,
        onComplete: () => {
          isLasso();
        }
      });

      var scene = new ScrollMagic.Scene({
          triggerElement: "#cat-animation",
          triggerHook: 0.5,
          reverse: false
        })
        .setTween(tl)
        .addTo(controller);

    }

    const isTruckFinish = () => {
      seToStartTrackAnimation
        .set(state.offer.track, {
          x: -widthScreen,
        })
        .to(state.offer.track, {
          x: 0,
          ease: Power3.easeOut,
          duration: 2,
        });
    }

    const isWordFinish = () => {
      setWord
        .from(state.offer.word, {
          opacity: 1,
          y: 0,

        })
        .to(state.offer.word, {
          opacity: 0,
          duration: .5,
          y: -20,
        })
    }
    const eyeCat = () =>{
      var eye = $(".js-cat-eye"),
      eye_2 = $(".js-cat-eye-2");
        var tl2 = new TimelineMax({
          repeat: 0,
        });

       var tl1 = new TimelineMax({
          repeat: -1,
        });

      tl2.from(eye, {
        autoAlpha: 1,
        visibility:"visible",
        ease: Elastic.easeOut
      });
      
      tl2.to(eye, {
        duration: 1.5,
        visibility:"hidden",
        autoAlpha: 0,
        ease: Elastic.easeOut,
      });
      
      tl1.from(eye_2, {
        autoAlpha: 0,
        duration: 2,
        y: 0,
        ease: Elastic.easeOut,
      });
      
      tl1.to(eye_2, {
        duration: 1.5,
        autoAlpha: 1,
        y: -4,
        ease: Elastic.easeOut,
      });
    }

    eyeCat();
    isTruck();
  }
}