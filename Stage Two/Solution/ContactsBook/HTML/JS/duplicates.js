window.onload = function () {

    var array = new array();

    function duplicates() {
        for (i = 0; i < loggedInAccount.contacts.length; i++) {
            for (j = 0; j < array.length; j++) {
                if (loggedInAccount.contacts[i].mobilePhone == array[j, 0].mobilePhone) {
                    array[j, 1] = array[i, 1] + 1;
                }
                else {
                    array[j, 0] = loggedInAccount.contacts[i];
                    array[j, 1] = 1;
                }
            }
        }
    }


    var FillOutHTML = function () {
        document.getElementById("usernameLogout").innerHTML = loggedInAccount.username;
        document.getElementById("searchBarMain").value = "";
        var icon = document.getElementById("userIcon");
        icon.value = loggedInAccount.username.substring(0, 1).toUpperCase();

        var contactsHTML = "";

        for (var i = 0; i < array.length; i++) {
            contactsHTML += "<div id='contact' class='contact' >\n";
            contactsHTML += "<div class='col-md-3'><p>" + array[i, 0].forename + " " + array[i, 0].surname + "</p></div>\n";
            contactsHTML += "<div class='col-md-2'><p>" + array[i, 0].mobilePhone + "</p></div>\n";
            contactsHTML += "<div class='col-md-2'><p>" + array[i, 0].email + "</p></div>\n";

            contactsHTML += "<div class='col-md-2'><p>";
            if (loggedInAccount.contacts[i].tags) {
                for (var y = 0; y < array[i, 0].tags.length; y++) {
                    contactsHTML += "<span style='color: " + loggedInAccount.contacts[i].tags[y].colour.toString() + "; font-weight: bold '>";
                    contactsHTML += array[i, 0].tags[y].name;
                    contactsHTML += "</span>";
                }
            }
            contactsHTML += "</p></div>\n";

            contactsHTML += "<div class='col-md-1'><input type='button' class='smsEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
            contactsHTML += "<div class='col-md-1'><input type='button' class='callEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
            contactsHTML += "<div class='col-md-1'><input type='button' class='contactEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
            contactsHTML += "</div>";
            contactsHTML += "<hr>";
        }

        document.getElementById("contacts").innerHTML = contactsHTML.toString();


        var emailBTNS = document.getElementsByClassName("contactEmailBTN");

        for (var i = 0; i < emailBTNS.length; i++) {
            emailBTNS[i].onclick = function (num) {
                return function () {
                    OnClick_EmailContact(num);
                }
            }(i);
        }

        var contacts = document.getElementsByClassName("contact");

        for (var i = 0; i < contacts.length; i++) {
            contacts[i].onclick = function (num) {
                return function () {
                    OnClick_EditContact(num, loggedInAccount.contacts);
                }
            }(i);
        }

    }
}