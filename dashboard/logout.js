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