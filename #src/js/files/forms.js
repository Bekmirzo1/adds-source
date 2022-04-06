
// *form eye
document.addEventListener("click", function (e) {
	const target = e.target;
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

//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		if (!select.classList.contains('none')) {
			select_init(select);
		}
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selectActive = document.querySelector('.select._active');
	if (selectActive) {
		if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
			const select_body_options = selectActive.querySelector('.select__options');
			selectActive.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');
	const select_placeholder = select.getAttribute('data-placeholder');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		if (select_placeholder) {
			select_type_content = `<div class="select__value _icon-down"><input autocomplete="off" type="text" name="form[]" value="" data-error="Ошибка" placeholder="${select_placeholder}" class="select__input input"></div>`;
		} else if (!select_placeholder) {
			select_type_content = '<div class="select__value _icon-down"><input autocomplete="off" type="text" name="form[]" value="" data-error="Ошибка" class="select__input input"></div>';
		}
	} else if (select_type == 'icon') {
		// select_type_content = '<div class="select__value _icon-down"'+ '<span class="">' +'<span class="select__text">' + select_selected_text + '</span></div>';
		const selectIconPlaceholder = select.getAttribute('data-icon-placeholder');

		if (selectIconPlaceholder) {
			select_type_content = `<div class="select__value _icon-down"><span class="${select_selected_option.className}"></span></div> <input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="${selectIconPlaceholder}" class="input">`
		} else {
			select_type_content = `<div class="select__value _icon-down"><span class="${select_selected_option.className}"></span></div> <input autocomplete="off" type="text" name="form[]" data-error="Ошибка" class="input">`
		}
	} else {
		if (!select.hasAttribute('multiple')) {
			select_type_content = '<div class="select__value _icon-down"><span>' + select_selected_text + '</span></div>';
		} else{
			select_type_content = '<div class="select__value _icon-down"><span class="select__value-items"></span></div>';
		}
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div hidden class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const selectValue = selectTitle.querySelector('.select__value');
	const selectValueItemsParent = selectValue.querySelector('.select__value-items');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	if (original.hasAttribute('multiple')) {
		const originalsSelected = original.querySelectorAll('[selected]');
		if (originalsSelected.length > 0) {
			for (let index = 0; index < originalsSelected.length; index++) {
				const originalSelected = originalsSelected[index];
				const activeValue = select.querySelector(`.select__option[data-value="${originalSelected.value}"]`);
				activeValue.classList.add('_selected')
			}

		}
	}
	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			let selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				console.log(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
		console.log(selectedOptionsText);
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		// if (select_type == 'input') {
		// select_input.addEventListener('keyup', select_search);
		// } else {
		if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
			select_option.style.display = 'none';
		}
		if (original.hasAttribute('multiple')) {
			let originalOptions = original.querySelectorAll('option');
			const spans = document.createElement('span');
			spans.className = `select__value-item select__value-item_${index+1}`;
			// console.log(spans);
			// spans[select_option_value].classList.add(`selected__item`)
			// spans[select_option_value].classList.add(`selected__item_${select_option_value}`)
			selectValueItemsParent.append(spans)
			const selectValueItems = selectValueItemsParent.querySelectorAll('.select__value-item');
			selectValueItems[index].innerHTML = `<span class="select__value-item-text">${select_option.innerHTML}</span><span class="select__value-item-close"></span>`;
			if (select_option.classList.contains('_selected')) {
				selectValueItems[index].classList.add('_selected');
			}
		}
		// }
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = '';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					// select_option.classList.toggle('_selected');
					/* selectMultiItems(); */
				} else {
					if (select_type == 'icon') {
						select.querySelector('.select__value').innerHTML = `<span class="${select_option.dataset.icon}"></span>`;
					} else {
						select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					}
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				const select_option_class = select_option.className;
				if (select_option_class) {
					select_options_content = `${select_options_content}<div data-value="${select_option_value}" class="select__option ${select_option_class}" data-icon="${select_option_class}">${select_option_text}</div>`;
				} else {
					select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
				}
			}
		}
		return select_options_content;
	}
}
/* function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
} */
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


