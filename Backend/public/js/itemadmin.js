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


var myApp = angular.module('app', []);
 
     myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
 
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
 
     myApp.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);
 
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
 
           .success(function(){
           })
 
           .error(function(){
           });
            $http({
      method: 'GET',
      url: 'http://localhost:3000/fileuploadname'
    }).then(function successCallback(response) {
       
        var data = {
            id: foo,
            photo: response.data
        }
       
		socket.emit('updatePhoto', data);
        
    }, function errorCallback(response) {
      console.log(response);
    });
        }
     }]);
 
     myApp.controller('profile', ['$scope', 'fileUpload', function($scope, fileUpload, $http){
        $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/savedata";
           fileUpload.uploadFileToUrl(file, uploadUrl);
          location.reload();
        };
         
         $scope.user = '';
	var getitem = function() {
		socket.emit('getItem', foo);
	}
    getitem();

 socket.on('receiveItem',function(list){
	$scope.$apply(function() {
		$scope.items = list;
        $scope.photo = list.photo;
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
//mongodb socket to change user details
$scope.editItem = function() {
	var data = {
        id: foo,
		desc: document.getElementById("desc").value,
		extra_desc: document.getElementById("extra_desc").value,
		price: document.getElementById("price").value,
		category: document.getElementById("category").value,
        pay_method: document.getElementById("pay_method").value,
		paid_by: {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zip: document.getElementById("zip").value
        }
	}
	socket.emit('editItemInfo',data)
	location.reload();
}    



var updateTag = function(data) {
    var item = {
        id: foo,
        tags: data
    }
    socket.emit('updateTags',item);
    getitem();
}
 
$scope.addTag = function() {
    var data = $scope.tags;
    data.push(document.getElementById("tag").value);
    updateTag(data);
}

$scope.removeTag = function(tag) {
    var data = $scope.tags;
    for (var i = 0 ; i <= data.length - 1; i++) {
        if (data[i] == tag) {
            data.splice(i,1);
        }
    }
    updateTag(data);
}


     }]);




