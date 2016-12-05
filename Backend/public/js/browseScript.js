var socket=io();

//start app
angular.module('app',[]).controller('results', function($scope) {
//simple angular module to get all items related to search from
var getitems = function() {
	socket.emit('getList', 'items');
}
getitems();
$scope.search = function() {
	var search = document.getElementById("search").value;
    if (search == '') {
        getitems();
    }else {
	   socket.emit('searchThis',search);
    }
}	

$scope.viewItem = function(item) {
    window.location.href = 'item.html?id='+item._id;
}
	
socket.on('browseRes', function(result) {
	$scope.$apply(function() {
		console.log(result);
		$scope.list = result;
	});
});
    
socket.on('receiveList',function(list){
	$scope.$apply(function() {
		$scope.list = list;
	});
 
})

});