var url = document.URL;
var category = url.substring(url.lastIndexOf('=') + 1);

var items = [];
var categoryTags = ["blue", "black", "Strong", "ersl", "weal"];

var itemsLength = items.length;
var categoryTagsLength = categoryTags.length;


$(document).ready(function() {
	// Fill in information for the all of the category's tags
	var tagsElement = $("#TagsElement");

	var innerHTML = "";
	for (var i =0; i < categoryTagsLength; i++) {
		var currentCategory = categoryTags[i];

		innerHTML += '<div class="checkbox">';
		innerHTML += '<input id="' + currentCategory + '" type="checkbox" class="checkbox1">';
		innerHTML += '<label for="' + currentCategory + '">';
		innerHTML += currentCategory;
		innerHTML += '</label>';
		innerHTML += '</div>';
	}

	tagsElement.append(innerHTML);


	// Propogate this category's items
	var itemsElement = $("#ItemsElement");

	innerHTML = "";
	for (var i = 0; i < itemsLength; i++) {
		innerHTML += '<div class="thumbnail">';
		innerHTML += '<img src="' + 'http://placehold.it/320x150' + 'alt="Item Picture">';
		innerHTML += '<div class="caption">';
		innerHTML += '<h4 class="pull-right">$' + items[i].price + '</h4>';
		innerHTML += '<h4><a href="#"' + items[i].desc + '</a></h4>';    // FIX ME: add link to item page
		innerHTML += '<p>' + items[i].extra_desc + '</p>';
		innerHTML += '</div>';
		innerHTML += '</div>';
	}
	itemsElement.append(innerHTML);
});













