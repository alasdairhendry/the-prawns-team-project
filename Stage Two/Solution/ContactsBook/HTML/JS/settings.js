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
}

var flag = 0;
var clear = function(){
            loggedInAccount.contacts.splice(0, loggedInAccount.contacts.Length);
            flag=1;
            cleared();
}

function cleared() {
    var x = document.getElementById("cleared");
        x.style.display = "block";
}