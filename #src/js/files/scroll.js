// *Side wrapper
let scr_fix_block = document.querySelectorAll('._side-wrapper');
if (scr_fix_block.length > 0) {
	window.addEventListener('scroll', function () {
		fix_block(scr_fix_block)
		function fix_block(scr_fix_block) {
			if (scr_fix_block) {
				let scr_value = pageYOffset;
				let window_width = parseInt(window.innerWidth);
				let window_height = parseInt(window.innerHeight);
				let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
				// let header_height = 15;
				for (let index = 0; index < scr_fix_block.length; index++) {
					const block = scr_fix_block[index];
					let block_width = block.getAttribute('data-width');
					const item = block.querySelector('._side-block');
					if (!block_width) { block_width = 0; }
					if (window_width > block_width) {
						if (item.offsetHeight < window_height - (header_height + 30)) {
							if (scr_value > offset(block).top - (header_height)) {
								item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
							} else {
								gotoRelative(item);
							}
							if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height))) {
								block.style.cssText = "position:relative;";
								item.style.cssText = "position:absolute;bottom:0px;top:auto;left:0px;width:100%";
							}
						} else {
							gotoRelative(item);
						}
					}
				}
				function gotoRelative(item) {
					item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
				}
			}
		}
	});
}


// * LazyLoading
window.addEventListener("load", function () {
	const lazyImages = document.querySelectorAll('[data-src]');
	if (lazyImages.length > 0) {
		const options = {
			rootMargin: "0px 0px 50px 0px",
			threshold: 0
		};
		const imageObserver = new IntersectionObserver(lazyImages => {
			for (let index = 0; index < lazyImages.length; index++) {
				const lazyImage = lazyImages[index];
				if (lazyImage.isIntersecting) {
					loadImage(lazyImage.target)
					imageObserver.unobserve(lazyImage.target);
				} else {
					return;
				}
			}
		}, options);

		function loadImage(image) {
			if (image.dataset.src) {
				image.src = image.dataset.src;
				image.removeAttribute('data-src');
				if (image.previousElementSibling) {
					webpDelete(image)
				}
			}
		}

		function webpDelete(img) {
			const webp = img.previousElementSibling;
			if (webp.tagName == 'SOURCE') {
				const dataImgSrc = img.getAttribute('src').split('.');
				if (dataImgSrc[1] !== 'svg') {
					dataImgSrc[1] = 'webp'
				}
				const dataImgSrcWebp = dataImgSrc.join('.');
				webp.setAttribute('srcset', dataImgSrcWebp);
				webp.removeAttribute('data-srcset');
			}
		}

		lazyImages.forEach(image => {
			if (image.getBoundingClientRect().top + pageYOffset > pageYOffset) {
				imageObserver.observe(image);
			} else {
				loadImage(image);
			}
		});
	}

	const loadMapBlock = document.querySelector('._load-map');
	if (loadMapBlock && !loadMapBlock.classList.contains('_loaded')) {
		const loadMapUrl = loadMapBlock.dataset.map;
		if (loadMapUrl) {
			const options = {
				rootMargin: "100px 0px 100px 0px",
				threshold: 0
			};
			const mapObserver = new IntersectionObserver((lazymap) => {
				if (lazymap[0].isIntersecting) {
					loadMapBlock.insertAdjacentHTML(
						'beforeend',
						`<iframe src="${loadMapUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
					)
					loadMapBlock.removeAttribute('data-map')
					loadMapBlock.classList.add('_loaded')
					mapObserver.unobserve(lazymap[0].target)
				} else {
					return;
				}
			}, options);
			mapObserver.observe(loadMapBlock);
		}
	}
});


// *ScrollOnClick (Navigation)
const link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		const el = link[index];
		const block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(300);
			}
			const target_block_class = el.getAttribute('href').replace('#', '');
			const target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}
	window.addEventListener('scroll', function (el) {
		const old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				const el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			const block = blocks[index];
			const block_item = document.querySelector('.' + block);
			if (block_item) {
				const block_offset = offset(block_item).top;
				const block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					const current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						const current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
const goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		const goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(300);
			}
			const target_block_class = goto_link.getAttribute('href').replace('#', '');
			const target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}

// *Scroll to top of the window
const scrollTops = document.querySelectorAll('._scrolltop');
if (scrollTops.length > 0) {
	for (let index = 0; index < scrollTops.length; index++) {
		const scrollTop = scrollTops[index];
		scrollTop.addEventListener('click', function (e) {
			_goto(document.body, 800)
			e.preventDefault();
		});
	}
}

// *Scroll next
const scrollNext = document.querySelector('.fullscreen__next');
if (scrollNext) {
	if (!_is_hidden(scrollNext)) {
		const full = document.querySelector('.fullscreen');
		const fullNext = full.nextElementSibling;
		scrollNext.addEventListener('click', function (e) {
			_goto(fullNext, 800)
			e.preventDefault();
		});
	}
}

function _goto(target_block, speed, offset = 0) {
	const moveTo = new MoveTo({
		tolerance: offset,
		duration: speed,
		easing: 'easeOutQuart'
	});
	moveTo.move(target_block);
}

// *accurate page left/top coordinates
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// *Animation on scroll
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = animItem.getBoundingClientRect().top + pageYOffset;
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_anim')
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_anim');
				}
			}
		}
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}