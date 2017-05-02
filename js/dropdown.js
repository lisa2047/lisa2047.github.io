'use strict';
var dropdown = document.querySelector("#dropdown-menu"),
	dropdownItems = document.querySelectorAll(".dropdown-item"),
	table = document.querySelector('.table-one'),
	tableRowTemplate = document.querySelector('#table-row-template'),
	dataValue = "lensmaster";


// фильтры при переходе
if (window.location.href.indexOf('?') != -1) {
	dataValue = window.location.href.split('?')[1];
	for (var g = 0; g < dropdownItems.length; g++) {
		if (dropdownItems[g].getAttribute('data-value') === dataValue) {
			$('.dropdown-toggle-text').html(dropdownItems[g].innerText);
		}
	}
}

// ф-я отрисовки таблицы (некроссбраузерно)
// var parseRow = function (element) {
// 	var elementToClone = tableRowTemplate.content.querySelector('.table-row');
// 	var row = elementToClone.cloneNode(true);
// 	table.appendChild(row);
// 	row.classList.add('templated-row');
// }

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
			document.querySelector('div .error-message').classList.remove('hidden');
			document.querySelector('div .error-message').innerText += ' Error' + evt.target.status;
		} else if (evt.target.status >= 200) {
			cb(evt.target.response);
		}
	});

	newRequest.open('GET', url);
	newRequest.send();

};

//ф-я отрисовки таблицы (кроссбраузерно)
function templateContent(template) {
    if("content" in document.createElement("template")) {
        return document.importNode(template.content, true);
    } else {
        var fragment = document.createDocumentFragment();
        var children = template.childNodes;
        for (var i = 0; i < children.length; i++) {
            fragment.appendChild(children[i].cloneNode(true));
        }
        return fragment;
    }
}

// ф-я записи данных в нужную ячейку таблицы

function writeData(array, userAgent, listNode) {
	for (var d = 0; d < array.length; d++) {
		if (userAgent.msie || userAgent.msie10 || userAgent.version === '11.0') {
			array.forEach(function(elem, item, arr) {
				listNode[item+1].innerHTML = elem;
			})
		} else {
			array.forEach(function(elem, item, arr) {
				listNode[item].innerHTML = elem;
			})
		}
	}	
}

// парсим данные в таблицу
var parseData = function(array) {
	for (var z = 0; z < array.length; z++) {
		if(array[z].retailer === dataValue){
			var key = array[z].retailer;
			var listName = array[z][key].name;
			var listSupplier = array[z][key].supplier;
			var listProductName = array[z][key].productName;
			var listRetailer = array[z][key].retailerName;
			var productPrice = array[z][key].productPrice;

			//кроссбраузерно

			// отрисовка нужного количества строк в таблице
			for (var q = 0; q < listName.length; q++) {
				var myDiv = document.querySelector(".table-one");
				var template = document.querySelector("template#table-row-template");
				var content = templateContent(template);
					myDiv.appendChild(content);
			}

			// определяем userAgent
			var uAgent = navigator.userAgent || '';

			var browser = {
				version : (uAgent.match( /.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
				opera : /opera/i.test(uAgent),
				msie : (/msie/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie6 : (/msie 6/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie7 : (/msie 7/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie8 : (/msie 8/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie9 : (/msie 9/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie10 : (/msie 10/i.test(uAgent) && !/opera/i.test(uAgent)),
				mozilla : /firefox/i.test(uAgent),
				chrome : /chrome/i.test(uAgent),
				safari : (!(/chrome/i.test(uAgent)) && /webkit|safari|khtml/i.test(uAgent)),
				iphone : /iphone/i.test(uAgent),
				ipod : /ipod/i.test(uAgent),
				iphone4 : /iphone.*OS 4/i.test(uAgent),
				ipod4 : /ipod.*OS 4/i.test(uAgent),
				ipad : /ipad/i.test(uAgent),
				ios : /ipad|ipod|iphone/i.test(uAgent),
				android : /android/i.test(uAgent),
				bada : /bada/i.test(uAgent),
				mobile : /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(uAgent),
				msie_mobile : /iemobile/i.test(uAgent),
				safari_mobile : /iphone|ipod|ipad/i.test(uAgent),
				opera_mobile : /opera mini|opera mobi/i.test(uAgent),
				opera_mini : /opera mini/i.test(uAgent),
				mac : /mac/i.test(uAgent),
				webkit : /webkit/i.test(uAgent),
				android_version: parseFloat(uAgent.slice(uAgent.indexOf("Android")+8)) || 0
			};

			// записываем данные

			var nameCell = document.querySelectorAll('.name');
			var supplierCell = document.querySelectorAll('.supplier');
			var productNameCell = document.querySelectorAll('.productName');
			var retailerCell = document.querySelectorAll('.retailer');
			var priceCell = document.querySelectorAll('.price');

			writeData(listName, browser, nameCell);
			writeData(listSupplier, browser, supplierCell);
			writeData(listProductName, browser, productNameCell);
			writeData(listRetailer, browser, retailerCell);
			writeData(productPrice, browser, priceCell);

		}

	}
};

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
});