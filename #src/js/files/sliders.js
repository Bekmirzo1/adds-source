//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
        if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
        }
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
        const sliderScrollItem = sliderScrollItems[index];
        const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
        const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observeParents: true,
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: sliderScrollBar,
                draggable: true,
                snapOnRelease: false
            },
            mousewheel: {
                releaseOnEdges: true,
            },
        });
        sliderScroll.scrollbar.updateSize();
    }
}


function sliders_bild_callback(params) { }

if (document.querySelector('.slider__body')) {
    new Swiper('.slider__body', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        //touchRatio: 0,
        //simulateTouch: false,
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        //pagination: {
        //	el: '.slider-quality__pagging',
        //	clickable: true,
        //},
        // Arrows
        navigation: {
            nextEl: '.about__more .more__item_next',
            prevEl: '.about__more .more__item_prev',
        },
        /*
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1268: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        */
        on: {
            lazyImageReady: function () {
                ibg();
            },
        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}
if (document.querySelector('.slider-happy__body')) {
    const sliderHappy = document.querySelector('.slider-happy');
    new Swiper('.slider-happy__body', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,

        autoHeight: true,
        speed: 800,
        watchOverflow: true,
        //touchRatio: 0,
        //simulateTouch: false,
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        //pagination: {
        //	el: '.slider-quality__pagging',
        //	clickable: true,
        //},
        // Arrows
        navigation: {
            nextEl: '.slider-happy__nav .slider-arrow_next',
            prevEl: '.slider-happy__nav .slider-arrow_prev',
        },

        breakpoints: {
            0: {
                slidesPerView: 1.28,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1023.98: {
                slidesPerView: 2,
                spaceBetween: 40,
            }
        },
        on: {
            unlock: function () {
                sliderHappy.classList.add('_lock')
            },
            lock: function () {
                sliderHappy.classList.remove('_lock')
            },
        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}
if (document.querySelector('.activities__body')) {
    new Swiper('.activities__body', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        speed: 800,
        watchOverflow: true,
        slidesPerView: 1,
        // effect: 'flip',
        effect: 'coverflow',
        coverflowEffect: {
            // depth: 1000,
            // rotate: 300,
            // slideShadows: false,
            // modifier: 1,
            // rotate: 50,
            rotate: 0,
            stretch: 0,
            depth: 20,
            slideShadows: false,
            modifier: 0,
        },
        // autoHeight: false,
        // touchRatio: 2,
        // simulateTouch: false,
        // touchMove: false, 
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        pagination: {
            el: '.activities__pagination',
            type: 'fraction',
        },
        // Arrows
        navigation: {
            nextEl: '.activities__nav .slider-arrow_next',
            prevEl: '.activities__nav .slider-arrow_prev',
        },
        // breakpoints: {
        //     0: {
        //         slidesPerView: 1.28,
        //         spaceBetween: 16,
        //     },
        //     768: {
        //         slidesPerView: 2,
        //         spaceBetween: 20,
        //     },
        //     1023.98: {
        //         slidesPerView: 2,
        //         spaceBetween: 40,
        //     }
        // },
        // on: {
        // }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}
if (document.querySelector('.game__slider-body')) {
    const gameSlider = document.querySelector('.game__slider');
    new Swiper('.game__slider-body', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        // autoHeight: true,
        speed: 800,
        watchOverflow: true,
        //touchRatio: 0,
        //simulateTouch: false,
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        //pagination: {
        //	el: '.slider-quality__pagging',
        //	clickable: true,
        //},
        // Arrows
        navigation: {
            nextEl: '.game__nav .slider-arrow_next',
            prevEl: '.game__nav .slider-arrow_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.28,
                spaceBetween: 16,
            },
            479.98: {
                slidesPerView: 1.8,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1023.98: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        },
        on: {
            unlock: function () {
                gameSlider.classList.add('_lock')
            },
            lock: function () {
                gameSlider.classList.remove('_lock')
            },
        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}
if (document.querySelector('.news__slider')) {
    new Swiper('.news__slider', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        speed: 800,
        watchOverflow: true,
        // slidesPerView: 2,
        // autoHeight: true,
        //touchRatio: 0,
        //simulateTouch: false,
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        //pagination: {
        //	el: '.slider-quality__pagging',
        //	clickable: true,
        //},
        // Arrows
        navigation: {
            nextEl: '.news__nav .slider-arrow_next',
            prevEl: '.news__nav .slider-arrow_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.28,
                spaceBetween: 16,
            },
            479.98: {
                slidesPerView: 1.8,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1023.98: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        },
        // on: {
        //     unlock: function () {
        //         gameSlider.classList.add('_lock')
        //     },
        //     lock: function () {
        //         gameSlider.classList.remove('_lock')
        //     },
        // }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}
if (document.querySelector('.slider-reasons__body')) {
    let sliderReasons = new Swiper('.slider-reasons__body', {
        /*
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        speed: 800,
        watchOverflow: true,
        init: false,
        // centeredSlides: true,
        // loop: true,
        // autoHeight: false,
        // touchRatio: 2,
        // simulateTouch: false,
        // touchMove: false, 
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        // pagination: {
        //     // el: '.chart-reasons__list',
        //     type: 'bullets',
        //     bulletClass: 'chart-reasons__item',
        //     bulletActiveClass: '_active',
        // },
        // Arrows
        navigation: {
            nextEl: '.slider-reasons__nav .slider-arrow_next',
            prevEl: '.slider-reasons__nav .slider-arrow_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 1.2,
                spaceBetween: 30,
            },
            1023.98: {
                spaceBetween: 40,
            },
            1260: {
                slidesPerView: 1,
            },
        },
        on: {
            init: function () {
                slideToActive();
            },
            slideChange: function () {
                leftRight();
                customSliderPagination();
            },
            // slideChangeTransitionStart: function () {
            // },
        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });


    const chartReasons = document.querySelector('.chart-reasons');
    const items = chartReasons.querySelectorAll('.chart-reasons__item');
    items.forEach((item, index) => {
        window.getComputedStyle(item);
        item.setAttribute('data-rotate', index * 36);
        item.setAttribute('data-index', index + 1);
        item.classList.add(`chart-reasons__item_${index + 1}`)
    });

    const itemActive = chartReasons.querySelector('.chart-reasons__item._active');
    const line = chartReasons.querySelector('.chart-reasons__line');
    const imagesParent = chartReasons.querySelector('.chart-reasons__image');
    const images = imagesParent.querySelectorAll('img');

    function slideRotate(itemActive) {
        line.style.transform = `rotate(${itemActive.dataset.rotate}deg)`;
    }
    slideRotate(itemActive);

    function slideToActive(item = itemActive) {
        sliderReasons.slideTo(item.dataset.index - 1);
    }

    function removeClasses() {
        const itemActive = chartReasons.querySelector('.chart-reasons__item._active');
        const itemNext = chartReasons.querySelector('.chart-reasons__item._next');
        if (itemActive) {
            itemActive.classList.remove('_active')
        }
        if (itemNext) {
            itemNext.classList.remove('_next')
        }
    }

    function changeActive(item) {
        removeClasses();
        if (item.dataset.index == 10) {
            const item1 = chartReasons.querySelector('.chart-reasons__item_1');
            item1.classList.add('_next')
        }
        item.classList.add('_active');
        // images.forEach((image, index) => {
        //     console.log(index);
        //     // image[item.dataset.index - 1].classList.add('_active');
        // });
        // for (let index = 0; index < images.length; index++) {
        //     const image = images[index];
        // }
        slideRotate(item);
    }

    document.addEventListener("click", function (e) {
        const target = e.target;
        if (target.closest('.chart-reasons__item')) {
            const item = target.closest('.chart-reasons__item');
            if (item.dataset.index == 1 && item.classList.contains('_next')) {
                line.style.transform = `rotate(360deg)`;
                removeClasses();
                item.classList.add('_active');
                chartReasons.classList.add('_reverse');
            }
            slideToActive(item);
        }
    });

    const trsTime = 300;
    let timeChange;
    function leftRight() {
        const item = chartReasons.querySelector(`.chart-reasons__item_${sliderReasons.realIndex + 1}`);
        const itemActive = chartReasons.querySelector('.chart-reasons__item._active');
        if (item.dataset.index > 6) {
            if (!chartReasons.classList.contains('_left')) {
                timeChange = ((6 - itemActive.dataset.index) / (item.dataset.index - itemActive.dataset.index)) * trsTime;
                setTimeout(() => {
                    chartReasons.classList.add('_left')
                }, timeChange);
            }
        } else if (item.dataset.index < 6) {
            if (chartReasons.classList.contains('_left')) {
                timeChange = ((itemActive.dataset.index - 6) / (itemActive.dataset.index - item.dataset.index)) * trsTime;
                setTimeout(() => {
                    if (!chartReasons.classList.contains('_reverse')) {
                        chartReasons.classList.remove('_left')
                    }
                }, timeChange);
            }
        }
    }

    function customSliderPagination() {
        const item = chartReasons.querySelector(`.chart-reasons__item_${sliderReasons.realIndex + 1}`);
        const imageActive = imagesParent.querySelector('._active');
        imageActive.classList.remove('_active');
        images[Number(item.dataset.index)-1].classList.add('_active');
        if (chartReasons.classList.contains('_reverse')) {
            setTimeout(() => {
                chartReasons.classList.remove('_reverse')
                chartReasons.classList.remove('_left')
                changeActive(item);
            }, 800);
        } else {
            changeActive(item);
        }
    }

    sliderReasons.init();
}
