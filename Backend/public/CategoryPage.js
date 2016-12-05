var items = [];

function getParameter(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var foo = getParameter('category');
console.log(foo);

var socket = io();

angular.module('app',[]).controller('results', function($scope, $http) {
    $scope.user = '';
	var getitem = function() {
		socket.emit('getCategoryItems', foo);
	}
    getitem();

 

$scope.viewItem = function(item) {
    window.location.href = 'category.html?category='+item._id;
}

socket.on('receiveCategoryItems',function(list){
	$scope.$apply(function() {
		$scope.list = list;
		items = $scope.list;
	});
 
})
});


var url = document.URL;
var category = url.substring(url.lastIndexOf('=') + 1);

var categoryTags = ["blue", "black", "Strong", "ersl", "weal"];

var itemsLength = items.length;
var categoryTagsLength = categoryTags.length;

console.log(items);

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