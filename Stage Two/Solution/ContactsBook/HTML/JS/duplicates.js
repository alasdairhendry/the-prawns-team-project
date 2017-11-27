// Javascript functions directly used with the account.html page

window.onload = function () {
    CheckURL();
}

var CheckURL = function () {

    var url = document.location.href;

    // Make Sure we have a username, or return to login page
    if(!url.includes("name="))
    {
        console.log("Does not include name tag");
        document.location.href = "../UserValidation.html";
    }

    var params = url.split('?')[1].split('&'),
        data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    // We made it this far so we have a username, Call Login for that username
    Login(data.name);
}

var OnLoginSuccess = function () {
    console.log("Logged In");
    FillOutHTML();
}

var FillOutHTML = function () {
    document.getElementById("usernameLogout").innerHTML = loggedInAccount.username;
    var icon = document.getElementById("userIcon");
    icon.value = loggedInAccount.username.substring(0, 1).toUpperCase();
}





// var array = new array();

// function duplicates() {
//     for (i = 0; i < loggedInAccount.contacts.length; i++) {
//         for (j = 0; j < array.length; j++) {
//             if (loggedInAccount.contacts[i].mobilePhone == array[j, 0].mobilePhone) {
//                 array[j, 1] = array[i, 1] + 1;
//             }
//             else {
//                 array[j, 0] = loggedInAccount.contacts[i];
//                 array[j, 1] = 1;
//             }
//         }
//     }
// }

