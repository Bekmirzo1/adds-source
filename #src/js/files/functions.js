// *isMobile
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support === true) {
        document.querySelector('html').classList.add('_webp');
    } else {
        document.querySelector('html').classList.add('_no-webp');
    }
});

// *wrapper onload change
window.addEventListener("load", function () {
    if (document.querySelector('.wrapper')) {
        setTimeout(function () {
            document.querySelector('.wrapper').classList.add('_loaded');
        }, 0);
    }
});

// *header on scroll change
const header = document.querySelector('.header');
if (header) {
    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            header.classList.remove('_scroll');
        } else {
            header.classList.add('_scroll');
        }
    };
    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(header);
}

let unlock = true;

// *iconMenu
let menuBody = document.querySelector('.menu');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
    let delay = 500;
    iconMenu.addEventListener("click", function (e) {
        if (unlock) {
            body_lock(delay);
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }
    });
};
// Menu close
function menu_close() {
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
    const body = document.querySelector('body');
    body.classList.remove('_lock')
}

// *BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}
function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}
function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

// *Custom checkboxes
const customCheckboxes = document.querySelectorAll('._custom-chk');
if (customCheckboxes.length > 0) {
    for (let index = 0; index < customCheckboxes.length; index++) {
        const customCheckbox = customCheckboxes[index];
        customCheckbox.addEventListener('click', function () {
            customCheckbox.classList.toggle('_active')
        });
    }
}

// *Сhange active
const clickItemParents = document.querySelectorAll('._items-parent');
if (clickItemParents.length > 0) {
    for (let index = 0; index < clickItemParents.length; index++) {
        const clickItemParent = clickItemParents[index];
        const clickItems = clickItemParent.querySelectorAll('._item-click');
        for (let index = 0; index < clickItems.length; index++) {
            const clickItem = clickItems[index];
            clickItem.addEventListener('click', function (e) {
                const clickItemActive = clickItemParent.querySelector('._item-click._active');
                clickItemActive.classList.remove('_active');
                clickItem.classList.add('_active');
                e.preventDefault();
            });
        }
    }
}

document.addEventListener('click', function (e) {
    const target = e.target;
    // *items with submenu
    if (document.querySelector('._item')) {
        const subItemActive = document.querySelector('._item._change');
        if (subItemActive) {
            if (!target.closest('._item._change')) {
                subItemActive.classList.remove('_change');
            }
        }
        if (target.closest('._item__link') && target.closest('._item')) {
            if (target.closest('._item._pc') && isMobile.any()) {
                changeItemActive(target);
            } else {
                changeItemActive(target);
            }
        }
    }
    // *form eye
    if (target.closest('.form__eye')) {
        const eye = target.closest('.form__eye');
        const formPassword = eye.previousElementSibling;
        if (formPassword && formPassword.tagName === 'INPUT') {
            if (!eye.classList.contains('_show')) {
                eye.classList.add('_show')
                formPassword.type = 'password';
            } else {
                eye.classList.remove('_show')
                formPassword.type = 'text';
            }
        }
    }
});
function changeItemActive(target) {
    if (!target.closest('._item._change')) {
        target.closest('._item').classList.add('_change');
    } else {
        target.closest('._item').classList.remove('_change')
    }
}

// *Tabs
let tabs = document.querySelectorAll("._tabs");
if (tabs.length > 0) {
    for (let index = 0; index < tabs.length; index++) {
        let tab = tabs[index];
        let tabs_items = tab.querySelectorAll("._tabs-item");
        let tabs_blocks = tab.querySelectorAll("._tabs-block");
        for (let index = 0; index < tabs_items.length; index++) {
            let tabs_item = tabs_items[index];
            tabs_item.addEventListener("click", function (e) {
                if (!tabs_item.classList.contains('_active')) {
                    const tabs_itemActive = tab.querySelector('._tabs-item._active');
                    const tabs_blockActive = tab.querySelector('._tabs-block._active');
                    tabs_itemActive.classList.remove('_active')
                    tabs_blockActive.classList.remove('_active')
                    tabs_item.classList.add('_active');
                    tabs_blocks[index].classList.add('_active');
                }
                e.preventDefault();
            });
        }
    }
}

// *Spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных спойлеров
    if (spollersRegular) {
        initSpollers(spollersRegular);
    }
    // Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(',')[0];
    });
    // Инициализация спойлеров с медиа запросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointsArray.push(breakpoint)
        });

        // Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
        // Работа с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объект с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Событие
            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener('click', setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener('click', setSpollerAction);
            }
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock)
                }
                spollerTitle.classList.toggle('_active')
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}


/*
    Для родителя спойлеров пишем атрибут data-spollers
    Для загаловков спойлеров пишем атрибут data-spoller
    
    Если нужно включать\выключать работу спойлеров на разных размерах экрана пишем параметры ширины и типа брейкпоинта
    Например:
    data-spollers="920,max" - спойлеры будут работать на экранах меньше 920px
    data-spollers="767,min" - спойлеры будут работать на экранах больше 767px

    Если нужно чтобы в блоке открывался только один спойлер к атрибуту data-spollers добавляем атрибут data-one-spoller
 */

// *Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
    gallery_init();
}
function gallery_init() {
    for (let index = 0; index < gallery.length; index++) {
        const el = gallery[index];
        lightGallery(el, {
            counter: false,
            selector: 'a',
            download: false
        });
    }
}

// *Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
        if (unlock) {
            let item = el.getAttribute('href').replace('#', '');
            let video = el.getAttribute('data-video');
            popup_open(item, video);
        }
        e.preventDefault();
    })
}
for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__body')) {
            popup_close(e.target.closest('.popup'));
        }
    });
}
function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup_' + item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup_video');
            popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu._active')) {
            body_lock_add(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', '#' + item);
    }
}
function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('_active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('_active');
        }
        if (!document.querySelector('.menu._active') && bodyUnlock) {
            body_lock_remove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}
document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        popup_close();
    }
});

// *Slide Toggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide')
        }, duration);
    }
};
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};
// * Filter
const filterLinks = document.querySelectorAll('.filter__link');
const filterCards = document.querySelectorAll('.filter__card');
if (filterCards.length > 0) {
    for (let index = 0; index < filterLinks.length; index++) {
        const filterLink = filterLinks[index];
        filterLink.addEventListener('click', function (e) {
            filterLinkClicked(filterLink);
            filterLinksNoTouch(e.target, filterLinks);
            filterBody(filterLink.dataset.filter, filterCards);
        });
    }
    function filterLinkClicked(filterLink) {
        const opened = document.querySelectorAll('.filter__link._opened');
        if (opened) {
            opened[0].className = opened[0].className.replace(' _opened', '');
            filterLink.classList.add('_opened');
        }
    }

    function filterLinksNoTouch(target, links) {
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            if (link.dataset.filter && !link.classList.contains('_no-touch')) {
                if (target.dataset.filter !== 'all') {
                    link.classList.add('_no-touch');
                } else if (target.dataset.filter.toLowerCase() === 'all') {
                    link.classList.remove('_no-touch');
                }
            }
            const linkAnim = document.querySelector('.filter__link._opened');
            linkAnim.addEventListener('transitionend', function () {
                link.classList.remove('_no-touch');
            });
        }
    }

    function filterBody(category, items) {
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const ItemFilter = item.classList.contains(category);
            const ShowAll = category.toLowerCase() === 'all';
            item.classList.add('_show')
            if (!ShowAll) {
                item.addEventListener('transitionend', function () {
                    if (!ItemFilter) {
                        item.classList.add('_hide')
                        item.classList.remove('_show')
                    } else if (ItemFilter) {
                        item.classList.remove('_hide')
                        item.classList.remove('_show')
                    }
                });

            } else {
                item.addEventListener('transitionend', function () {
                    item.classList.remove('_show')
                    item.classList.remove('_hide')
                });
            }
        }
    }
}

//IsHidden
function _is_hidden(el) {
    return (el.offsetParent === null)
}