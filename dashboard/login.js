      
$('#signUpBtn').click(function () {


	console.log("Sign Up button was clicked");

	var email = $('#usernameSignUpTextField').val();
	var password = $('#passwordSignUpTextField').val();

	if (email == null || email == undefined || email == "") {
		alert("Please enter Email")
	}

	if (password == null || password == undefined || password == "") {
		alert("Please enter Password");
	}

	if (password.length < 6) {
		alert("Password must contain minimum 6 characters");
	}

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...

	  console.log("data from server ",errorMessage);
	  console.log("code from server ", errorCode);

	});
});

$('#loginBtn').click(function () {

	var email = $('#usernameLoginTextField').val();
	var password = $('#passwordLoginTextField').val();

	if (email == null || email == undefined || email == "") {
		alert("Please enter Email");
	}

	if (password == null || password == undefined || password == "") {
		alert("Please enter Password");
	}

	if (password.length < 6) {
		alert("Password must contain minimum 6 characters");
	}

	var user = firebase.auth().signInWithEmailAndPassword(email, password);
	user.catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...

	  console.log("data from server ",errorMessage);
	  console.log("code from server ", errorCode);

	  console.log("this was ", this);

	});

	console.log("user was ", user);

	
});