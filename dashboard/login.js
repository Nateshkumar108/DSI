$(document).ready(function () {
    $('#signup-form').hide();
});

$('#signUpBtnInLogin').click(function () {

    $('#signup-form').show();
    $('#login-form').hide();
});
$('#back').click(function () {
    $('#signup-form').hide();
    $('#login-form').show();
});

$('#signUpBtn').click(function () {

    console.log("Sign Up button was clicked");

    var email = $('#usernameSignUpTextField').val();
    var password = $('#passwordSignUpTextField').val();
    var cnfrm_password = $('#c_passwordSignUpTextField').val();

    console.log("email was " + email + " and password was " + password);

    if (email == null || email == undefined || email == "") {
        alert("Please enter Email");
        return false;
    }

    if (password == null || password == undefined || password == "") {
        alert("Please enter Password");
        return false;
    }

    if (password.length < 6) {
        alert("Password must contain minimum 6 characters");
        return false;
    }
    if (password !== cnfrm_password) {
        console.log("password not match ");
        alert("Password and Confirm Password not match !!!");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        // signed up successfully and logged in
        console.log("signup");
        //redirect to dashboard
        window.location.href = "login.html";
        // window.location="/dashboard/";

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
        console.log("data from server ", errorMessage);
        console.log("code from server ", errorCode);


    });

});

$('#loginBtn').click(function () {

    var email = $('#usernameLoginTextField').val();
    var password = $('#passwordLoginTextField').val();
    console.log("email was " + email + " and password was " + password);

    if (email == null || email == undefined || email == "") {
        alert("Please enter Email");
        return false;
    }

    if (password == null || password == undefined || password == "") {
        alert("Please enter Password");
        return false;
    }

    if (password.length < 6) {
        alert("Password must contain minimum 6 characters");
        return false;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {

        console.log("Signed IN Successfully with data ", data);

        if (data != null) {
            // reedirect to dashboard
            window.location.href = "index.html";
            // window.location="/dashboard/";

        }


    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("data from server ", errorMessage);
        console.log("code from server ", errorCode);

    });

    // firebase.auth().signOut().then(function () {
    // 	console.log("Signed OUT Successfully");
    // }).catch(function(error) {
    // 	console.log("The error occured with ", error);
    // });

});

$('#logoutId').click(function () {
    console.log("logout clicked");

    firebase.auth().signOut().then(function () {
        console.log("Signed OUT Successfully");
        //redirect to Login.html
        window.location.href = "login.html";

    }).catch(function (error) {
        console.log("The error occured with ", error);
    });

});