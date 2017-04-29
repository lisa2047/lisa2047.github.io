var dropdown = document.querySelector("#dropdown-menu"),
	dropdownItems = document.querySelectorAll(".dropdown-item"),
	table = document.querySelector('.table-one'),
	tableRowTemplate = document.querySelector('#table-row-template'),
	dataValue = "lensmaster";
	console.log(window.location.href)

	if (window.location.href.indexOf('?') != -1) {
		dataValue = window.location.href.split('?')[1];
		for (var g = 0; g < dropdownItems.length; g++) {
			if (dropdownItems[g].getAttribute('data-value') === dataValue) {
				$('.dropdown-toggle-text').html(dropdownItems[g].innerText);
				// $(this).html()
			}
		}
	}
	
	// console.log(dataValue)

// ф-я смены значения в ввыпадашки

// var valueDroptown = {
// 									"happy-look": "ACULIFE",
// 									"optic-city": "AiroMoist",
// 									"optika-center": "Airzone",
// 									"amur-vision": "Assol",
// 									"club-optica-ru": "Club Optica",
// 									"perspectiva": "Cont",
// 									"kord": "Crystal/AirWay",
// 									"lensmaster": "iWear",
// 									"in-optika-ru": "in Optika.ru ",
// 									"zaidi-uvidish": "NNC",
// 									"doktor-linz": "Доктор Линз",
// 									"kronos": "Кронос/Kronos",
// 									"likont": "МКЛ-Био",
// 									"ochki-dlya-vas": "Очки для вас",
// 									"prozrenie": "Прозрение/Prozrenie",
// 									"tochka-zreniya": "Точка Зрения/Tochka Zreniya"
// }

// ф-я отрисовки таблицы
var parseRow = function (element) {
	var elementToClone = tableRowTemplate.content.querySelector('.table-row');
	var row = elementToClone.cloneNode(true);
	table.appendChild(row);
	row.classList.add('templated-row');
}

//ф-я удаления старой таблицы
var deleteRows = function() {
	var elementsToDelete = table.querySelectorAll('.templated-row');
	for (var i = 0; i < elementsToDelete.length; i++) {
		deleteRow(elementsToDelete[i]);
	}
}
//ф-я удаления старой строки
var deleteRow = function (node) {
	table.removeChild(node);
};

// ф-я запроса json
var load = function (url, cb) {
	var newRequest = new XMLHttpRequest();

	newRequest.addEventListener('load', function (evt) {
		if (evt.target.status >= 400) {
			document.querySelector('header').innerText += 'Error' + evt.target.status;
		} else if (evt.target.status >= 200) {
			cb(evt.target.response);
		}
	});


	newRequest.open('GET', url);
	newRequest.send();

};

//ф-я парсинга данных в таблицу

var parseData = function(array) {
	for (var z = 0; z < array.length; z++) {
		if(array[z].retailer === dataValue){
			var key = array[z].retailer;
			var listName = array[z][key].name;
			var listSupplier = array[z][key].supplier;
			var listProductName = array[z][key].productName;
			var listRetailer = array[z][key].retailerName;
			var productPrice = array[z][key].productPrice;

			for (var q = 0; q < listName.length; q++) {
				parseRow();		
			}


			listName.forEach(function(elem, item, arr) {
				$('.name')[item].innerHTML = elem;
			})

			listSupplier.forEach(function(elem, item, arr) {
				$('.supplier')[item].innerHTML = elem;
			})

			listProductName.forEach(function(elem, item, arr) {
				$('.productName')[item].innerHTML = elem;
			})

			listRetailer.forEach(function(elem, item, arr) {
				$('.retailer')[item].innerHTML = elem;
			})

			productPrice.forEach(function(elem, item, arr) {
				$('.price')[item].innerHTML = elem;
			})

		}

	}
}

//колбэк для загрузчика (парсинг json)
// var callBack = function (evt) {
// 	var obj = JSON.parse(evt);
// 	var items = [];
// 	for (var i = 0; i < obj.length; i++) {
// 		var elementToParce = obj[i];
// 		items.push(elementToParce);
// 	}

// 	parseData(items);
// }

// $(document).on('load', function () {

// 	for (var p = 0; p < dropdownItems.length; p++) {
// 		if (dropdownItems[p] === dataValue) {
// 			console.log(dropdownItems[p] )
// 			// $('.dropdown-toggle').on('load', function() {
// 			// 	$('.dropdown-menu').slideToggle();
// 			// });

// 			// $('.dropdown-item').on('load', function(){
// 			// 	$('.active').removeClass('active');

// 			// 	$(this).addClass('active');

// 			// 	$('.dropdown-toggle-text').html($(this).html());
// 			// 	$('.dropdown-menu').delay(200).slideToggle();

// 			// });

// 		}
// 	}
// })
$(document).ready(function(){




	$('.dropdown-toggle').on('click', function() {
		$('.dropdown-menu').slideToggle();
	});




	$('.dropdown-item').on('click', function(){
		$('.active').removeClass('active');

		$(this).addClass('active');

		$('.dropdown-toggle-text').html($(this).html());
		$('.dropdown-menu').delay(200).slideToggle();

	});

	
	load('js/json/tables.json', function (evt) {
		var obj = JSON.parse(evt);
		var items = [];
		for (var i = 0; i < obj.length; i++) {
			var elementToParce = obj[i];
			items.push(elementToParce);
		}

		parseData(items);
	});
	// console.log(dataValue)

});


//получаем значение в выпадашке
dropdown.addEventListener('click', function () {

	for (var z = 0; z < dropdownItems.length; z++) {
		if (dropdownItems[z].classList.contains('active')) {
			dataValue = dropdownItems[z].getAttribute('data-value');
		}
	}

	dropdown.setAttribute('data-value', dataValue);
	deleteRows()

	// загрузка файла

	load('js/json/tables.json', function (evt) {
		var obj = JSON.parse(evt);
		var items = [];
		for (var i = 0; i < obj.length; i++) {
			var elementToParce = obj[i];
			items.push(elementToParce);
		}

		parseData(items);
	});
	// console.log(dataValue)

});