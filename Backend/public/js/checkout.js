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

var foo = getParameter('id');

var socket=io();


angular.module('app',[]).controller('profile', function($scope, $http) {
    $scope.user = '';
	var getitem = function() {
		socket.emit('getItem', foo);
	}
    getitem();


    
socket.on('receiveItem',function(list){
    console.log(list);
	$scope.$apply(function() {
		$scope.items = list;
        if (list.table == 'items') {
            $scope.title = 'Thank You !';
            $scope.message = '';
            var item = {
		      table: 'items',
              newtable: 'pickup',
              paid: false,
		      name: list
	        }
	        socket.emit('editItem',item);
        }else {
            $scope.title = 'Sorry !';
            $scope.message = '';
        }
	});
 
})


 
});

