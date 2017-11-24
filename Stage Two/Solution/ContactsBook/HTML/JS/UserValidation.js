window.onload = function () {
    ConfigureLogin();
    ConfigureRegister();
    ConfigureForgotUsername();
    ConfigureForgotPassword();
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
    var forgotUsername = document.getElementById("forgotUsername");
    var forgotPassword = document.getElementById("forgotPassword");

    noAccount.onclick = function () {
        document.getElementById("regDiv").style["display"] = "block";
        document.getElementById("loginDiv").style["display"] = "none";

        login.value = "";
        password.value = "";
    }

    forgotUsername.onclick = function () {
        document.getElementById("forgotUsernameDiv").style["display"] = "block";
        document.getElementById("loginDiv").style["display"] = "none";

        login.value = "";
        password.value = "";
    }

    forgotPassword.onclick = function () {
        document.getElementById("forgotPasswordDiv").style["display"] = "block";
        document.getElementById("loginDiv").style["display"] = "none";

        login.value = "";
        password.value = "";
    }

    submit.onclick = function () {

        firebase.database().ref("accounts/").once("value").then(function (snapshot) {

            var foundMatchingUser = false;
            var matchingUser = "";

            snapshot.forEach(function (child) {
                var newItemValue = JSON.parse(child.val());

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
                    LoadAccountPage(matchingUser.username);
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

var ConfigureForgotUsername = function(){
    var email = document.getElementById("fuEmail");
    var securityText = document.getElementById("fuSecurityText");
    var submit = document.getElementById("fuSubmit");
    var cancel = document.getElementById("fuCancel");


    cancel.onclick = function () {
        document.getElementById("forgotUsernameDiv").style["display"] = "none";
        document.getElementById("loginDiv").style["display"] = "block";

        email.value = "";
        securityText.value = "";
    }

        submit.onclick = function () {
            if(email.value == "" || securityText.value == "")
                return;

            firebase.database().ref("accounts/").once("value").then(function (snapshot) {

                var foundMatchingUser = false;
                var matchingUser = "";


                snapshot.forEach(function (child) {
                    var newItemValue = JSON.parse(child.val());

                    if (newItemValue.email == email.value) {
                        foundMatchingUser = true;
                        matchingUser = newItemValue;
                    }

                    if (foundMatchingUser)
                    {
                        if (matchingUser.securityText == securityText.value)
                        {

                            // newItemValue.username = username.value;
                            // UpdateAccountOnDatabase(newItemValue);
                            SendEmail("alasdairhendry@gmail.com", matchingUser.email, "Forgotten your ContactsBook Username?" , "Hi, your Username is " + matchingUser.username + ". Best Regards, The Prawns Support Team.");

                            document.getElementById("forgotUsernameDiv").style["background-color"] = "green";
                            document.getElementById("fuNotification").innerHTML = "<p>Username changed</p>";
                            document.getElementById("forgotUsernameDiv").style["display"] = "none";
                            document.getElementById("loginDiv").style["display"] = "block";
                        }
                        else
                        {
                            document.getElementById("forgotUsernameDiv").style["background-color"] = "#fd7871";
                            document.getElementById("fuNotification").innerHTML = "<p>Incorrect security question.</p>";
                        }
                    }
                    else
                    {
                        document.getElementById("forgotUsernameDiv").style["background-color"] = "#fd7871";
                        document.getElementById("fuNotification").innerHTML = "<p>User Does Not Exist.</p>";
                    }
                });

            })
        }
    }




var ConfigureForgotPassword = function(){
    var email = document.getElementById("fpEmail");
    var securityText = document.getElementById("fpSecurityText");
    var password = document.getElementById("newPassword");
    var submit = document.getElementById("fpSubmit");
    var cancel = document.getElementById("fpCancel");


    cancel.onclick = function () {
        document.getElementById("forgotPasswordDiv").style["display"] = "none";
        document.getElementById("loginDiv").style["display"] = "block";

        email.value = "";
        securityText.value = "";
    }

    submit.onclick = function () {
        if(email.value == "" || securityText.value == "")
            return;

        firebase.database().ref("accounts/").once("value").then(function (snapshot) {

            var foundMatchingUser = false;
            var matchingUser = "";

            snapshot.forEach(function (child) {
                var newItemValue = JSON.parse(child.val());

                if(newItemValue.email == email.value) {
                    foundMatchingUser = true;
                    matchingUser = newItemValue;

                }

                if(foundMatchingUser)
                {
                    if(matchingUser.securityText == securityText.value)
                    {
                        newItemValue.password = password.value;
                        UpdateAccountOnDatabase(newItemValue);

                        document.getElementById("forgotPasswordDiv").style["background-color"] = "green";
                        document.getElementById("fpNotification").innerHTML = "<p>Password changed</p>";
                        document.getElementById("forgotPasswordDiv").style["display"] = "none";
                        document.getElementById("loginDiv").style["display"] = "block";
                    }
                    else
                    {
                        document.getElementById("forgotPasswordDiv").style["background-color"] = "#fd7871";
                        document.getElementById("fpNotification").innerHTML = "<p>Incorrect security question.</p>";
                    }
                }
                else
                {
                    document.getElementById("forgotPasswordDiv").style["background-color"] = "#fd7871";
                    document.getElementById("fpNotification").innerHTML = "<p>User Does Not Exist.</p>";
                }
            });


        })


    }

}


var ConfigureRegister = function () {
    var username = document.getElementById("regUsername");
    var email = document.getElementById("regEmail");
    var password = document.getElementById("regPassword");
    var conPassword = document.getElementById("regConPassword");
    var securityText = document.getElementById("regSecurityText");
    var submit = document.getElementById("regSubmit");
    var cancel = document.getElementById("regCancel");

    cancel.onclick = function () {
        document.getElementById("regDiv").style["display"] = "none";
        document.getElementById("loginDiv").style["display"] = "block";

        username.value = "";
        email.value = "";
        password.value = "";
        conPassword.value = "";
        securityText.value = "";
    }

    submit.onclick = function () {
         if(username.value == "" || email.value == "" || password.value == "" || conPassword.value == "" || securityText.value == "")
            return;

        firebase.database().ref("accounts/").once("value").then(function (snapshot) {

            var foundMatchingUser = false;
            var foundMatchingEmail = false;
            var matchingUser = "";


            snapshot.forEach(function (child) {
                var newItemValue = JSON.parse(child.val());

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
                    var newAccount = new Account(username.value, email.value, password.value, securityText.value);
                    AddAccountToDatabase(newAccount);
                    // firebase.database().ref("accounts/" + username.value).set({
                    //     username: username.value,
                    //     password: password.value,
                    //     email: email.value,
                    //     securityText: securityText.value
                    //
                    // });

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