'use strict';

var table = document.querySelector('.table');
var retailer = document.querySelector('.retailer');

$.getJSON('json/tables.json', function (json) {
	console.log(json);
})
