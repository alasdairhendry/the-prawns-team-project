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
        LoadValidationPage();
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
    duplicates();
    FillOutHTML();
}

var FillOutHTML = function () {
    document.getElementById("usernameLogout").innerHTML = loggedInAccount.username;
    var icon = document.getElementById("userIcon");
    icon.value = loggedInAccount.username.substring(0, 1).toUpperCase();

    array.sort(function(a, b) {
        return parseFloat(a.mobilePhone) - parseFloat(b.mobilePhone);
    });


    var contactsHTML = "";

    for(var i = 1; i < array.length; i++)
    {
        contactsHTML += "<div id='contact' class='contact' >\n";
        contactsHTML += "<div class='col-md-3'><p>"+ array[i].forename + " " + array[i].surname +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ array[i].mobilePhone +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ array[i].email +"</p></div>\n";


        contactsHTML += "<div class='col-md-1'><input type='button' class='smsEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
        contactsHTML += "<div class='col-md-1'><input type='button' class='callEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
        contactsHTML += "<div class='col-md-1'><input type='button' class='contactEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n" ;
        contactsHTML += "</div>";
        contactsHTML += "<hr>";
    }

    document.getElementById("contacts").innerHTML = contactsHTML.toString();


    var emailBTNS = document.getElementsByClassName("contactEmailBTN");

    for(var i = 0; i < emailBTNS.length; i++)
    {
        emailBTNS[i].onclick = function (num) {
            return function () {
                OnClick_EmailContact(num);
            }
        }(i);
    }

    var callBTNS = document.getElementsByClassName("callEmailBTN");

    for(var i = 0; i < callBTNS.length; i++)
    {
        callBTNS[i].onclick = function (num) {
            return function () {
                document.location.href = "tel:" + array[num].mobilePhone;
                HideAllModals();
            }
        }(i);
    }

    var smsBTNS = document.getElementsByClassName("smsEmailBTN");

    for(var i = 0; i < smsBTNS.length; i++)
    {
        smsBTNS[i].onclick = function (num) {
            return function () {
                document.location.href = "sms:" + array[num].mobilePhone;
                HideAllModals();
            }
        }(i);
    }

    var contacts = document.getElementsByClassName("contact");

    for(var i = 0; i < contacts.length; i++)
    {
        contacts[i].onclick = function (num) {
            return function () {
                OnClick_EditContact(num, loggedInAccount.contacts);
            }
        }(i);
    }

}




var array=[1];

var duplicates = function() {

    var i;
    var j;
    var a;
    var flag;
    for (i = 0; i < loggedInAccount.contacts.length; i++) {
        flag=0;
        aflag=0;
        for (j = 0; j < loggedInAccount.contacts.length; j++) {
            if(loggedInAccount.contacts[i].mobilePhone==loggedInAccount.contacts[j].mobilePhone) {
                flag+=1;
            }
        }
       if(flag>1){
                array.push(loggedInAccount.contacts[i]);
       }
    }
}






