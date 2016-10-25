var categories = ["Appliances", "Clothing", "Electronics", "Fitness", "Home", "Jewelry", "Outdoor", "Toys"]
var categoryLength = categories.length;
console.log("gi");

$(document).ready(function() {
	var innerHtml = "";
	for(i = 0; i < categoryLength; i++) {
		innerHtml += '<li class="nav-item active">'
		innerHtml += '<a class="nav-link" href="';
		innerHtml += '#' + '">';
		innerHtml += categories[i] + '</a></li>';

		// console.log(categories[i]);
	}
	console.log(innerHtml);
	// innerHtml += 
	$('#theHead').append(innerHtml);

		// categories.each(function() {
	// 	console.log($(this));
	// })
});



/////// Slide ////////
jQuery(function($){
	'use strict';
	(function () {
		var $frame = $('#centered');
		var $wrap  = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'centered',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 4,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});
	}());
})