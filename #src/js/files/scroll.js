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