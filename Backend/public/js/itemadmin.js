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

 
//mongodb socket to change user details
$scope.editItem = function() {
	var data = {
		desc: document.getElementById("desc").value,
		extra_desc: document.getElementById("extra_desc").value,
		price: document.getElementById("price").value,
		category: document.getElementById("category").value,
		tags: document.getElementById("tags").value,
        pay_method: document.getElementById("pay_method").value,
		paid_by: document.getElementById("paid_by").value,
	}
	socket.emit('editItem',data)
	location.reload();
}    
 
$scope.addTag = function() {
    var data = {
        
    }
    socket.emit('addTag', data);
    getitem();
}

$scope.removeTag = function(tag) {
    var data = {
        
    }
    socket.emit('removeTag', data);
    getitem();
}
    
socket.on('receiveItem',function(list){
	$scope.$apply(function() {
		$scope.items = list;
        $scope.desc = list.desc;
        $scope.extra_desc = list.extra_desc;
        $scope.price = list.price;
        $scope.category = list.category;
        $scope.tags = list.tags;
        $scope.pay_method = list.pay_method;
        $scope.firstname = list.paid_by.firstname;
        $scope.lastname = list.paid_by.lastname;
        $scope.email = list.paid_by.email;
        $scope.phone = list.paid_by.phone;
        $scope.address = list.paid_by.address;
        $scope.city = list.paid_by.city;
        $scope.state = list.paid_by.state;
        $scope.zip = list.paid_by.zip;
	});
 
})


 
});


