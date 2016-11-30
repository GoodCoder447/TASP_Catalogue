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

var socket=io();


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
	});
 
})


 
});


