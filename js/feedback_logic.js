'use strict';

//непосредственно сортировка
function sort (id, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (!(arr[i].classList.contains(id)) && !(arr[i].classList.contains('hidden'))) {
			arr[i].classList.add('hidden')
			arr[i].nextSibling.nextSibling.classList.remove('hidden')
			arr[i].nextSibling.nextSibling.classList.add('hidden')
			/*console.log(arr[i].nextSibling.nextSibling);*/
		} else if (arr[i].classList.contains(id) && arr[i].classList.contains('hidden')) {
			arr[i].classList.remove('hidden')
			arr[i].nextSibling.nextSibling.classList.remove('hidden')
		}
	}
}

//делает лого активным
function addClassActive(logo) {
	document.getElementById('assol').classList.remove('active-logo');
	document.getElementById('iwear').classList.remove('active-logo');
	document.getElementById('kord').classList.remove('active-logo');

	logo.classList.add('active-logo');
}

//Функция сортировки отзывов по логотипам
var feedbackLogo = document.querySelector(".feedback.logo")
function sortFeedback () {
	feedbackLogo.addEventListener('click', function (evt) {
		var logo = evt.target.parentNode;
		var logoId = logo.getAttribute('id');
		var feedbackAll = document.querySelectorAll('div.feedback-container');
		var colFedsSpan = document.querySelector('.feedback.inner h1 span');


		if (logoId === 'iwear') {
			sort (logoId, feedbackAll);

			var colFeds = document.querySelectorAll('.iwear').length;
			colFedsSpan.innerHTML = '(' + colFeds + ' отзывов)';

			addClassActive(logo) 

		} else if (logoId === 'kord') {
			sort (logoId, feedbackAll);
			var colFeds = document.querySelectorAll('.kord').length;
			colFedsSpan.innerHTML = '(' + colFeds + ' отзывов)';

			addClassActive(logo) 

		} else if (logoId === 'assol') {
			sort (logoId, feedbackAll);
			var colFeds = document.querySelectorAll('.assol').length;
			colFedsSpan.innerHTML = '(' + colFeds + ' отзыва)';

			addClassActive(logo) 

		}
	})
}


//ф-я получения высоты элемента
function getElementHeight(elem) {
	var styleBlock = window.getComputedStyle(elem);
	var height = styleBlock.getPropertyValue('height');

	return height;
}

//функция увеличения высоты блоков

var moreAll = document.querySelectorAll(".more");
var lessAll = document.querySelectorAll(".less");

function encrementDiv () {
	for (var i = 0; i < moreAll.length; i++) {

		moreAll[i].addEventListener('click', function (evt) {
			var more = evt.target;
			var less = evt.target.parentNode.querySelector('.less')
			var containerEvt = evt.target.parentNode.parentNode.parentNode
			if (more) {
				more.classList.add('hidden');
				less.classList.remove('hidden');

				var blockTextImg = containerEvt.querySelector('.feedback-text');
				var blockText = containerEvt.querySelector('.text');
				var img = containerEvt.querySelector('.feedback-text img');

				var height = getElementHeight(blockText);
				var imgHeight = getElementHeight(img);

				var margin = 20;

				if (!(img.classList.contains('hidden'))) {
					blockTextImg.style.height = (parseInt(height) + parseInt(imgHeight) + margin) + 'px';
				} else {
					blockTextImg.style.height = height;
				}
			}
		});
	}
}


// уменьшение высоты блока 
function decrementDiv () {
	for (var i = 0; i < moreAll.length; i++) {

		lessAll[i].addEventListener('click', function (evt) {
			var less = evt.target;
			var more = evt.target.parentNode.querySelector('.more')
			var containerEvt = evt.target.parentNode.parentNode.parentNode
			if (less) {
				less.classList.add('hidden');
				more.classList.remove('hidden');

				var blockTextImg = containerEvt.querySelector('.feedback-text');
				var blockText = containerEvt.querySelector('.text');
				blockTextImg.style.height = '97px';
			}
		});
	}
}


sortFeedback ();
encrementDiv ();
decrementDiv ();