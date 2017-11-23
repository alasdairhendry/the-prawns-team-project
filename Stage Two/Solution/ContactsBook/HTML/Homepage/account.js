// Javascript functions directly used with the account.html page

window.onload = function () {
    var modal = document.getElementById("addContactModal");
    var btn = document.getElementById("btnAddContact");
    var confirmAddContactBTN = document.getElementById("addContactBTN");
    var cancelAddContactBTN = document.getElementById("cancelAddContactBTN");

    btn.onclick = function () {
        modal.style.display = "block";
    }

    confirmAddContactBTN.onclick = function () {
        OnClick_AddContact();
    }

    cancelAddContactBTN.onclick = function () {
        OnClick_CancelAddContact();
    }

    CheckURL();
}

var CheckURL = function () {

    var url = document.location.href;

    // Make Sure we have a username, or return to login page
    if(!url.includes("name="))
    {
        console.log("Does not include name tag");
        document.location.href = "../index.html";
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
    FillOutHTML();
    // window.history.pushState("object or string", "Contacts Book", "ContactsBook/HTML/account.html");
}

var FillOutHTML= function () {
    document.getElementById("usernameLogout").innerHTML = loggedInAccount.username;

    var contactsHTML = "";

    for(var i = 0; i < loggedInAccount.contacts.length; i++)
    {
        contactsHTML += "<div id='contact' class='contact'>\n";
        contactsHTML += "<div class='col-md-3'><p>"+ loggedInAccount.contacts[i].forename + " " + loggedInAccount.contacts[i].surname +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ loggedInAccount.contacts[i].mobilePhone +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ loggedInAccount.contacts[i].email +"</p></div>\n";

            contactsHTML += "<div class='col-md-2'><p>";
            if(loggedInAccount.contacts[i].tags) {
                for (var y = 0; y < loggedInAccount.contacts[i].tags.length; y++) {
                    contactsHTML += "<span style='color: " + loggedInAccount.contacts[i].tags[y].colour.toString() + "; font-weight: bold '>";
                    contactsHTML += loggedInAccount.contacts[i].tags[y].name;
                    contactsHTML += "</span>";
                }
            }
            contactsHTML += "</p></div>\n";

        contactsHTML += "<div class='col-md-1'><input type='button' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value='C'></div>\n";
        contactsHTML += "<div class='col-md-1'><input type='button' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value='S'></div>\n";
        contactsHTML += "<div class='col-md-1 contactEmailBTN'><input type='button' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value='E'></div>\n" ;
        contactsHTML += "</div>";
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

    var contacts = document.getElementsByClassName("contact");

    for(var i = 0; i < contacts.length; i++)
    {
        contacts[i].onclick = function (num) {
            return function () {
                OnClick_EditContact(num);
            }
        }(i);
    }

}

var OnClick_AddContact = function () {
    var forename = document.getElementById("acForename");
    var surname = document.getElementById("acSurname");

    var addOne = document.getElementById("acAddOne");
    var addTwo = document.getElementById("acAddTwo");
    var postcode = document.getElementById("acPostcode");
    var city = document.getElementById("acCity");
    var country = document.getElementById("acCountry");

    var mobile = document.getElementById("acMobile");
    var homePhone = document.getElementById("acHomePhone");
    var email = document.getElementById("acEmail");

    AddContactToAccount(loggedInAccount.value, forename.value, surname.value, addOne.value, addTwo.value, postcode.value, city.value, country.value, mobile.value, homePhone.value, email.value, false);
    UpdateAccountOnDatabase(loggedInAccount);
    FillOutHTML();

    forename.value = "";
    surname.value = "";

    addOne.value = "";
    addTwo.value = "";
    postcode.value = "";
    city.value = "";
    country.value = "";

    mobile.value = "";
    homePhone.value = "";
    email.value = "";

    document.getElementById('addContactModal').style.display='none'
}

var OnClick_CancelAddContact = function () {
    document.getElementById('addContactModal').style.display='none'
}

var OnClick_EditContact = function (index) {
    var modal = document.getElementById("editContactModal");
    modal.style.display = "block";

    var updateBTN = document.getElementById("updateEditContactBTN");
    updateBTN.onclick = function() {OnClick_UpdateEditContact(index)};

    var deleteBTN = document.getElementById("deleteEditContactBTN");
    deleteBTN.onclick = function() {OnClick_DeleteEditContact(index);}

    var forename = document.getElementById("ecForename");
    var surname = document.getElementById("ecSurname");

    var addOne = document.getElementById("ecAddOne");
    var addTwo = document.getElementById("ecAddTwo");
    var postcode = document.getElementById("ecPostcode");
    var city = document.getElementById("ecCity");
    var country = document.getElementById("ecCountry");

    var mobile = document.getElementById("ecMobile");
    var homePhone = document.getElementById("ecHomePhone");
    var email = document.getElementById("ecEmail");

    forename.value = loggedInAccount.contacts[index].forename;
    surname.value = loggedInAccount.contacts[index].surname;

    addOne.value = loggedInAccount.contacts[index].addressLineOne;
    addTwo.value = loggedInAccount.contacts[index].addressLineTwo;
    postcode.value = loggedInAccount.contacts[index].postcode;
    city.value = loggedInAccount.contacts[index].city;
    country.value = loggedInAccount.contacts[index].country;

    mobile.value = loggedInAccount.contacts[index].mobilePhone;
    homePhone.value = loggedInAccount.contacts[index].homePhone;
    email.value = loggedInAccount.contacts[index].email;
}

var OnClick_UpdateEditContact = function (index) {
    var forename = document.getElementById("ecForename");
    var surname = document.getElementById("ecSurname");

    var addOne = document.getElementById("ecAddOne");
    var addTwo = document.getElementById("ecAddTwo");
    var postcode = document.getElementById("ecPostcode");
    var city = document.getElementById("ecCity");
    var country = document.getElementById("ecCountry");

    var mobile = document.getElementById("ecMobile");
    var homePhone = document.getElementById("ecHomePhone");
    var email = document.getElementById("ecEmail");

    loggedInAccount.contacts[index].forename = forename.value;
    loggedInAccount.contacts[index].surname = surname.value;

    loggedInAccount.contacts[index].addressLineOne = addOne.value;
    loggedInAccount.contacts[index].addressLineTwo = addTwo.value;
    loggedInAccount.contacts[index].postcode = postcode.value;
    loggedInAccount.contacts[index].city = city.value;
    loggedInAccount.contacts[index].country = country.value;

    loggedInAccount.contacts[index].mobilePhone = mobile.value;
    loggedInAccount.contacts[index].homePhone = homePhone.value;
    loggedInAccount.contacts[index].email = email.value;

    document.getElementById('editContactModal').style.display='none'

    UpdateAccountOnDatabase(loggedInAccount);
    FillOutHTML();
}

var OnClick_DeleteEditContact = function (index) {
    var button = document.getElementById("deleteEditContactBTN");

    if(button.value == "Delete")
    {
        console.log("Poop");
        button.value = "Confirm";
    }
    else {
        console.log("Poop2");
        button.value = "Delete";
        loggedInAccount.contacts.splice(index, 1);

        HideAllModals();

        UpdateAccountOnDatabase(loggedInAccount);
        FillOutHTML();
    }
}

var OnClick_EmailContact = function (index) {
    var modal = document.getElementById("emailContactModal");
    modal.style.display = "block";

    var headerText = document.getElementById("emailContactHeaderText");
    headerText.innerHTML = "Email " + loggedInAccount.contacts[index].forename;

    var sendBTN = document.getElementById("emailContact_SendBTN");
    sendBTN.onclick = function() {OnClick_SendEmail(index)};

    var cancelBTN = document.getElementById("emailContact_CancelBTN");
    cancelBTN.onclick = function() {OnClick_CancelEmail(index);}
}

var OnClick_SendEmail = function () {
    
}

var OnClick_CancelEmail = function () {
    HideAllModals();
}

var HideAllModals = function () {
    document.getElementById('editContactModal').style.display='none'
    document.getElementById('addContactModal').style.display='none'
    document.getElementById('emailContactModal').style.display='none'
}
