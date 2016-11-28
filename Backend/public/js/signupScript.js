//socket
var socket = io();

$("#submit").click(function() {
	var userName = $('#userName').val();
	var password = $('#password').val();
	var cpassword = $('#password_confirmation').val();
	
	
	
	//make sure no fields are empty and password is at least 8 characterSet
	//and confirm password is same
	if (userName == '' || password == '' || cpassword == '') {
		document.getElementById("error").innerHTML = "Please fill out all fields.";
	}else if (!(password).match(cpassword)) {
		document.getElementById("error").innerHTML = "Your passwords don't match. Try again." ;
	}else {
		
		
		var user_data = {
			'userName': userName,
			'password': password,
				
		};
		//checks if username is already taken if so tell user
		socket.emit('userData', user_data);
		//if not then it stores into database
		socket.on('userNameCheck', function(check){
			if (!check) {
				document.getElementById("error").innerHTML = 'Username was taken. Try another one.';
			}else {
				document.getElementById("error").innerHTML = 'Made an account!';
				window.location.href = "login.html";
			}
		});
		
	}
	
});