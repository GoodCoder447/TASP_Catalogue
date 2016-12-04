var socket=io();


angular.module('app',[]).controller('profile', function($scope, $http) {
    $scope.user = '';
	var getitems = function() {
		socket.emit('getList', 'items');
	}
    var getarchive = function() {
        socket.emit('getArchive','archive');
    }
	//get user logged in
    $http({
      method: 'GET',
      url: 'http://localhost:3000/user'
    }).then(function successCallback(response) {
        if (response.data == '') {
            history.go(-1);
        }
      $scope.user = response.data;
		getitems();
        getarchive();
    }, function errorCallback(response) {
      console.log(response);
    });

//change password and returns whether old password is correct
//and if so changes it to new password and makes new salt
$scope.changePass = function() {
	var pass = document.getElementById("password").value;
	var cpass = document.getElementById("cpassword").value;
	var opass = document.getElementById("opassword").value;
	
	if (pass != cpass) {
		$scope.error = "Your passwords don't match";
	}else {
		socket.emit('changePass', opass,pass,$scope.user);
	}
}	 



//interactive message to tell user whether password is correct or not
socket.on('cPassRes', function(result) {
	$scope.$apply(function() {
		$scope.error = result;
	});
});
    
$scope.editItem = function(item) {
    window.location.href = 'itemadmin.html?id='+item._id;
}
    
//add item to list
$scope.addItem = function() {
	var item = {
		desc: document.getElementById("desc").value,
        extra_desc: '',
        price: document.getElementById("price").value,
        date_added: new Date(), 
        category: document.getElementById("category").value,
        tags: [],
        pay_method: '',
        paid_by: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        },
        paid: false,
        featured: false,
		table: 'items'
	}
	socket.emit('addItem',item);
	getitems();
}

$scope.feature = function(item) {
    var item = {
        featured: true,
        name: item
    }
    socket.emit('itemFeature', item);
    getitems();
}

$scope.unfeature = function(item) {
    var item = {
        featured: false,
        name: item
    }
    socket.emit('itemUnfeature', item);
    getitems();
}

//move item in list
$scope.movePickup = function(item) {
	var item = {
		table: 'items',
        newtable: 'pickup',
        paid: false,
		name: item
	}
	socket.emit('editItem',item);
	getitems();
}
$scope.moveSold = function(item) {
	var item = {
		table: 'items',
        newtable: 'sold',
        paid: true,
		name: item
	}
	socket.emit('editItem',item);
	getitems();
}
$scope.moveItems = function(item) {
	var item = {
		table: 'items',
        newtable: 'items',
        paid: false,
		name: item
	}
	socket.emit('editItem',item);
	getitems();
}

//remove item in list
$scope.removeItem = function(itemName) {
	var item = {
		table: 'items',
		name: itemName
	}
	socket.emit('removeItem',item);
	getitems();
}

$scope.moveArchive = function(itemName) {
    var item = {
        table: 'archive',
        name: itemName
    }
    var item1 = {
        table: 'items',
        name: itemName
    }
    socket.emit('moveDiffTable',item);
    socket.emit('removeItem',item1)
    getitems();
    getarchive();
    
}

$scope.moveToItems = function(itemName) {
    var item = {
        table: 'archive',
        name: itemName
    }
    var item1 = {
        table: 'items',
        name: itemName
    }
    socket.emit('moveDiffTable',item1);
    socket.emit('removeItem',item)
    getitems();
    getarchive();
    
}

//remove item in list
$scope.removeArchiveItem = function(itemName) {
	var item = {
		table: 'archive',
		name: itemName
	}
	socket.emit('removeItem',item);
	getarchive();
}
    
socket.on('receiveList',function(list){
	$scope.$apply(function() {
		$scope.items = list;
	});
 
})

socket.on('receiveArchive',function(list){
	$scope.$apply(function() {
		$scope.archive = list;
	});
 
})

 
});


