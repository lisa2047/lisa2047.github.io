'use strict';
window.dataValue = null; 
var links = document.querySelectorAll('.name-lable');/*,
	dataValue = null;*/

for (var i = 0; i < links.length; i++) {

	links[i].addEventListener('click', function(evt) {
		evt.preventDefault();
		var clickedLink = evt.target.parentNode;
		window.dataValue = clickedLink.getAttribute('data-value');
		console.log(window.dataValue)
		document.location.href = "labels.html?" + window.dataValue;
	})
}

// $(document).ready(function(){
// })