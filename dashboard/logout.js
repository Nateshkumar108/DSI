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

firebase.auth().onAuthStateChanged(function (user) {

    user = firebase.auth().currentUser;

    if (user) {
        console.log("signed in", user);

    } else {
        console.log("Not signed in", user);
        window.location.href = "login.html";

    }
});