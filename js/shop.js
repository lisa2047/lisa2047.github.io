'use strict';
window.dataValue = null; 
var links = document.querySelectorAll('.name-lable');

for (var i = 0; i < links.length; i++) {

	links[i].addEventListener('click', function(evt) {
		evt.preventDefault();
		var clickedLink = evt.target.parentNode;
		var dataValue = clickedLink.getAttribute('data-value');
		document.location.href = "labels.html?" + dataValue;
	})
}
