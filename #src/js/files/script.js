const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
if (formFields.length) {
    formFields.forEach(formField => {
        formField.dataset.placeholder = formField.placeholder;
    });
    document.body.addEventListener("focusin", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (targetElement.dataset.placeholder) {
                targetElement.placeholder = '';
            }
            targetElement.classList.add('_focus');
            targetElement.parentElement.classList.add('_focus');
        }
    });
    document.body.addEventListener("focusout", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (targetElement.dataset.placeholder) {
                targetElement.placeholder = targetElement.dataset.placeholder;
            }
            targetElement.classList.remove('_focus');
            targetElement.parentElement.classList.remove('_focus');
        }
    });
}
const languageMedia = window.matchMedia('(max-width: 1023.98px)');

const languageHeader = document.querySelector('.language-header');
if (languageHeader) {
    function languageDel(media) {
        if (media.matches) {
            languageHeader.classList.remove('_item');
        } else {
            languageHeader.classList.add('_item');
        }
    }
    languageMedia.addListener(languageDel);
    languageDel(languageMedia);
}
const profileHeader = document.querySelector('.profile-header');
if (profileHeader) {
    function profileDel(media) {
        if (media.matches) {
            profileHeader.classList.remove('_item');
        } else {
            profileHeader.classList.add('_item');
        }
    }
    // const profileMedia = window.matchMedia('(max-width: 1023.98px)');
    languageMedia.addListener(profileDel);
    profileDel(languageMedia);
}

const socialFooter = document.querySelector('.social-footer');
const emailFooter = document.querySelector('.footer__email');
window.addEventListener("load", function () {
    if (emailFooter && socialFooter) {
        function autoWidth(media) {
            if (!media.matches) {
                const emailFooterWidth = emailFooter.offsetWidth;
                const socialFooterWidth = socialFooter.offsetWidth;
                if (emailFooterWidth > socialFooterWidth) {
                    socialFooter.style.minWidth = emailFooterWidth + 'px';
                } else if (socialFooterWidth > emailFooterWidth) {
                    emailFooter.style.minWidth = socialFooterWidth + 'px';
                }
            } else {
                socialFooter.style.minWidth = 'auto';
                emailFooter.style.minWidth = 'auto';
            }
        }
        /* const widthMedia = window.matchMedia('(min-width: 1023.98px)');
        widthMedia.addListener(autoWidth);
        autoWidth(widthMedia); */
        languageMedia.addListener(autoWidth);
        autoWidth(languageMedia)
    }
});


// const coinImage = document.querySelector('._trs-coin-default');


const coinsImage = document.querySelectorAll('.coins__coin');
if (coinsImage.length > 0) {
    const body = document.body;
    const moveCoef = 0.15;
    let scrollParallax;
    function parallaxMob(media) {
        if (!media.matches) {
            body.classList.add('_parallax');
            scrollParallax = function () {
                for (let index = 0; index < coinsImage.length; index++) {
                    const coinImage = coinsImage[index];
                    if (!coinImage.closest('._not')) {
                        // берём огнаничивающий прямоугольник паралакса относительно окна (фрейма)
                        let r = coinImage.getBoundingClientRect();
                        // центр паралакса 
                        let parallaxYCenter = r.top + r.height / 2;
                        // центр экрана
                        let scrollYCenter = window.innerHeight / 2;

                        // Вычисляем смещение 
                        let move = (parallaxYCenter - scrollYCenter) * moveCoef;
                        // console.log(move);
                        coinImage.style.transform = `translate3d(0, ${move}%, 0)`;
                    }
                }
            }
            window.addEventListener("scroll", scrollParallax);
        } else if (media.matches && body.classList.contains('_parallax')) {
            body.classList.remove('_parallax');
            window.removeEventListener("scroll", scrollParallax);
            coinsImage.forEach(coinImage => {
                coinImage.style.transform = '';
            });
        }
    }
    const coinMedia = window.matchMedia('(max-width: 767.98px)');
    coinMedia.addListener(parallaxMob);
    parallaxMob(coinMedia);
}
/* const coinsImage = document.querySelectorAll('._trs-coin-default img');
if (coinsImage.length > 0) {
    let coinParallax;
    const body = document.body;
    function parallaxMob(media) {
        if (!media.matches) {
            body.classList.add('_parallax');
            let scaleNum;
            let direction;
            for (let index = 0; index < coinsImage.length; index++) {
                const coinImage = coinsImage[index];
                if (coinImage.dataset.scale) {
                    scaleNum = coinImage.dataset.scale;
                } else {
                    scaleNum = 2;
                }
                if (coinImage.dataset.direction) {
                    direction = coinImage.dataset.direction;
                } else {
                    direction = 'up left';
                }
                coinParallax = new simpleParallax(coinImage, {
                    orientation: direction,
                    // orientation: 'down',
                    scale: scaleNum,
                    overflow: true,
                    delay: .3,
                    transition: 'linear',
                    maxTransition: 60,
                });
            }
            // сoinParallax = new simpleParallax(coinsImage, {
            //     orientation: 'up left',
            //     // orientation: 'down',
            //     scale: 2,
            //     overflow: true,
            //     delay: .3,
            //     transition: 'linear',
            //     maxTransition: 60,
            // });
        } else if (media.matches) {
            if (body.classList.contains('_parallax')) {
                body.classList.remove('_parallax');
                coinParallax.destroy();
            }
        }
    }
    const coinMedia = window.matchMedia('(max-width: 767.98px)');
    coinMedia.addListener(parallaxMob);
    parallaxMob(coinMedia);
}*/

// *hug video
const animationHug = document.querySelector('.animation-hug');
if (animationHug) {
    const video = animationHug.querySelector('.animation-hug__cat video');
    document.addEventListener("click", function (e) {
        const target = e.target;
        if (target.closest('.animation-hug__click-text')) {
            video.play();
        }
    });
}