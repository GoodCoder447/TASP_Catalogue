var categories = ["Appliances", "Clothing", "Electronics", "Furniture", "Home", "Jewelry", "Outdoor", "Toys"]
var categoryLength = categories.length;

$(document).ready(function() {
	var innerHtml = "";
	for(i = 0; i < categoryLength; i++) {
		innerHtml += '<li class="nav-item active">'
		innerHtml += '<a class="nav-link" href="';

		innerHtml += 'CategoryPage.html?category=' + categories[i] +'">';

		innerHtml += categories[i] + '</a></li>';
	}
	$('#theHead').append(innerHtml);
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