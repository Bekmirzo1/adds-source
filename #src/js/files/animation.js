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
    isTruck();
  }
}