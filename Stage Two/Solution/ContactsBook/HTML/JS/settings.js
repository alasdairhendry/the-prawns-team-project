window.onload = function () {
    CheckURL();

    var clearBTN = document.getElementById("clearbutton");
    clearBTN.onclick = function () {
        clear();
    }
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


var clear = function(){
    console.log("1");
            loggedInAccount.contacts.splice(0, loggedInAccount.contacts.length);
            UpdateAccountOnDatabase(loggedInAccount);
            cleared();
}

function cleared() {
    var x = document.getElementById("cleared");
        x.style.display = "block";
}