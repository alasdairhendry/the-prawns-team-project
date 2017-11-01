window.onload = function () {
    ConfigureLogin();
    ConfigureRegister();
}

window.onclick = function () {
    ResetHighlights();
}

var ResetHighlights=function () {
    document.getElementById("loginDiv").style["background-color"] = "white";
    document.getElementById("logNotification").innerHTML = "";

    document.getElementById("regDiv").style["background-color"] = "white";
    document.getElementById("regNotification").innerHTML = "";
}

var ConfigureLogin = function () {
    var login = document.getElementById("logUsername");
    var password = document.getElementById("logPassword");
    var submit = document.getElementById("logSubmit");
    var noAccount = document.getElementById("logRegister");

    noAccount.onclick = function () {
        document.getElementById("regDiv").style["display"] = "block";
        document.getElementById("loginDiv").style["display"] = "none";

        login.value = "";
        password.value = "";
        document.getElementById("regSubmit").style["display"] = "block";
        document.getElementById("regCancel").value = "Cancel";
    }

    submit.onclick = function () {
        firebase.database().ref("accounts/").once("value").then(function (snapshot) {

            var foundMatchingUser = false;
            var matchingUser = "";

            snapshot.forEach(function (child) {
                var newItemValue = child.val();

                if(newItemValue.username == login.value) {
                    foundMatchingUser = true;
                    matchingUser = newItemValue;
                }
            });

            if(foundMatchingUser)
            {
                if(matchingUser.password == password.value)
                {
                    document.getElementById("loginDiv").style["background-color"] = "green";
                    document.getElementById("logNotification").innerHTML = "<p>Password Correct.</p>";
                    // window.location.href = "Index.html";
                }
                else
                {
                    document.getElementById("loginDiv").style["background-color"] = "#fd7871";
                    document.getElementById("logNotification").innerHTML = "<p>Incorrect Password.</p>";
                }
            }
            else
            {
                document.getElementById("loginDiv").style["background-color"] = "#fd7871";
                document.getElementById("logNotification").innerHTML = "<p>User Does Not Exist.</p>";
            }
        })
    }
}

var ConfigureRegister = function () {
    var username = document.getElementById("regUsername");
    var email = document.getElementById("regEmail");
    var password = document.getElementById("regPassword");
    var conPassword = document.getElementById("regConPassword");
    var submit = document.getElementById("regSubmit");
    var cancel = document.getElementById("regCancel");

    cancel.onclick = function () {
        document.getElementById("regDiv").style["display"] = "none";
        document.getElementById("loginDiv").style["display"] = "block";

        username.value = "";
        email.value = "";
        password.value = "";
        conPassword.value = "";
    }

    submit.onclick = function () {
        if(username.value == "" || email.value == "" || password.value == "" || conPassword.value == "")
            return;

        firebase.database().ref("accounts/").once("value").then(function (snapshot) {

            var foundMatchingUser = false;
            var foundMatchingEmail = false;
            var matchingUser = "";


            snapshot.forEach(function (child) {
                var newItemValue = child.val();

                if(newItemValue.username.toLowerCase() == username.value.toLowerCase()) {
                    foundMatchingUser = true;
                    matchingUser = newItemValue;
                }

                if(newItemValue.email.toLowerCase() == email.value.toLowerCase())
                {
                    foundMatchingEmail = true;
                    matchingUser = newItemValue;
                }
            });

            if(foundMatchingUser)
            {
                document.getElementById("regDiv").style["background-color"] = "#fd7871";
                document.getElementById("regNotification").innerHTML = "<p>Username Already Exists.</p>";
            }
            else if(foundMatchingEmail)
            {
                document.getElementById("regDiv").style["background-color"] = "#fd7871";
                document.getElementById("regNotification").innerHTML = "<p>Email Address Already Exists.</p>";
            }
            else
            {
                // Create User
                if(password.value === conPassword.value)
                {
                    firebase.database().ref("accounts/" + username.value).set({
                    username: username.value,
                    password: password.value,
                    email: email.value
                    });

                    document.getElementById("regNotification").innerHTML = "<p>Account Created.</p>";

                    cancel.value = "Return To Login";
                    submit.style["display"] = "none";
                }
                else
                {
                    document.getElementById("regDiv").style["background-color"] = "#fd7871";
                    document.getElementById("regNotification").innerHTML = "<p>Passwords Do Not Match.</p>";
                }
            }
        })
    }
}