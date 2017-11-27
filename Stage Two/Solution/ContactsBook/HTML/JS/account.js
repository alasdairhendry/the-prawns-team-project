// Javascript functions directly used with the account.html page

window.onload = function () {
    var btn = document.getElementById("btnAddContact");
    var confirmAddContactBTN = document.getElementById("addContactBTN");
    var cancelAddContactBTN = document.getElementById("cancelAddContactBTN");
    var searchBar = document.getElementById("searchBarMain");

    searchBar.onkeyup = function () {
        OnSearch();
    }

    btn.onclick = function () {
        OnClick_AddContact();
    }

    confirmAddContactBTN.onclick = function () {
        OnClick_ConfirmAddContact();
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
    if(loggedInAccount.tags.length<= 0 && loggedInAccount.addedTags === false)
    {
        var familyTag = new Tag("Family", "#42c5f4");
        var friendlyTag = new Tag("Friend", "#4df441");
        AddTagToAccount(loggedInAccount, familyTag);
        AddTagToAccount(loggedInAccount, friendlyTag);
        loggedInAccount.addedTags = true;
        UpdateAccountOnDatabase(loggedInAccount);
    }

    FillOutHTML();
    // window.history.pushState("object or string", "Contacts Book", "ContactsBook/HTML/account.html");
}

var FillOutHTML= function () {
    document.getElementById("usernameLogout").innerHTML = loggedInAccount.username;
    document.getElementById("searchBarMain").value = "";
    var icon = document.getElementById("userIcon");
    icon.value = loggedInAccount.username.substring(0, 1).toUpperCase();

    var contactsHTML = "";

    for(var i = 0; i < loggedInAccount.contacts.length; i++)
    {
        contactsHTML += "<div id='contact' class='contact' >\n";
        contactsHTML += "<div class='col-md-3'><p>"+ loggedInAccount.contacts[i].forename + " " + loggedInAccount.contacts[i].surname +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ loggedInAccount.contacts[i].mobilePhone +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ loggedInAccount.contacts[i].email +"</p></div>\n";

            contactsHTML += "<div class='col-md-2'><p>";
            if(loggedInAccount.contacts[i].tags) {
                for (var y = 0; y < loggedInAccount.contacts[i].tags.length; y++) {
                    contactsHTML += "<span style='color: " + loggedInAccount.contacts[i].tags[y].colour.toString() + "; font-weight: bold '>";
                    contactsHTML += loggedInAccount.contacts[i].tags[y].name + " ";
                    contactsHTML += "</span>";
                }
            }
            contactsHTML += "</p></div>\n";

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
                document.location.href = "+" + loggedInAccount.contacts[num].mobilePhone;
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

var OnSearch = function () {
    var searchValue = document.getElementById("searchBarMain").value;

    // If we cleared the search, reset the contacts
    if(searchValue === "")
    {
        FillOutHTML();
        return;
    }

    var filtered = [];

    for (var i = 0; i < loggedInAccount.contacts.length; i++)
    {
        var contact = loggedInAccount.contacts[i];
        if(contact.forename.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        {
            filtered.push(contact);
        }
        else if(contact.surname.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        {
            filtered.push(contact);
        }
        else if(contact.email.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        {
            filtered.push(contact);
        }
        else if(contact.homePhone.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        {
            filtered.push(contact);
        }
        else if(contact.mobilePhone.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        {
            filtered.push(contact);
        }
        else
        {
            var foundTag = false;

            for(var y = 0; y < loggedInAccount.contacts[i].tags.length; y++)
            {
                if(loggedInAccount.contacts[i].tags[y].name.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
                {
                    foundTag = true;
                }
            }

            if(foundTag)
                filtered.push(contact);
        }
    }

    // Display correct contacts
    var contactsHTML = "";

    for(var i = 0; i < filtered.length; i++)
    {
        contactsHTML += "<div id='contact' class='contact' >\n";
        contactsHTML += "<div class='col-md-3'><p>"+ filtered[i].forename + " " + filtered[i].surname +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ filtered[i].mobilePhone +"</p></div>\n";
        contactsHTML += "<div class='col-md-2'><p>"+ filtered[i].email +"</p></div>\n";

        contactsHTML += "<div class='col-md-2'><p>";
        if(filtered[i].tags) {
            for (var y = 0; y < filtered[i].tags.length; y++) {
                contactsHTML += "<span style='color: " + filtered[i].tags[y].colour.toString() + "; font-weight: bold '>";
                contactsHTML += filtered[i].tags[y].name;
                contactsHTML += "</span>";
            }
        }
        contactsHTML += "</p></div>\n";

        // contactsHTML += "<div class='col-md-1'><input type='button' class='smsEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
        // contactsHTML += "<div class='col-md-1'><input type='button' class='callEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n";
        // contactsHTML += "<div class='col-md-1'><input type='button' class='contactEmailBTN' style='border-radius: 100%; border-width: 0px; width: 32px; height: 32px' value=''></div>\n" ;
        contactsHTML += "</div>";
        contactsHTML += "<hr>";
    }

    // Check if no contacts were found in filter
    if(contactsHTML === "")
    {
        contactsHTML += "<p>No search results found.</p>";
    }

    document.getElementById("contacts").innerHTML = contactsHTML.toString();

    var contacts = document.getElementsByClassName("contact");

    for(var i = 0; i < contacts.length; i++)
    {
        contacts[i].onclick = function (num) {
            return function () {
                OnClick_EditContact(num, filtered);
            }
        }(i);
    }
}

var addContactTagsSelected = [];
var editContactTagsSelected = [];
var OnClick_AddContact = function () {
    addContactTagsSelected = [];
    var modal = document.getElementById("addContactModal");
    modal.style.display = "block";

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

    var geoBTN = document.getElementById("acGeoBTN");
    geoBTN.onclick = function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Success Callback

                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var google_maps_pos = new google.maps.LatLng(lat, lng);

                var google_maps_geocoder = new google.maps.Geocoder();
                google_maps_geocoder.geocode(
                    { 'latLng': google_maps_pos},
                    function(results, status){
                        if(status == google.maps.GeocoderStatus.OK && results[0]){
                            addOne.value = results[0].address_components[0].long_name;
                            addOne.value += " " + results[0].address_components[1].long_name;
                            addTwo.value = results[0].address_components[2].long_name;
                            postcode.value = results[0].address_components[7].long_name;
                            city.value = results[0].address_components[4].long_name;
                            country.value = results[0].address_components[5].long_name;
                        }
                    }
                );


            },  function () {
                // Failed Callback
                console.log("Callback Failed");
            })
    }

    var tagHTML = "";
    for(var i = 0; i < loggedInAccount.tags.length; i++)
    {
        tagHTML += "<input type='button' class='InputBox' value='"+loggedInAccount.tags[i].name+"' style='display: inline-block; background-color: " + loggedInAccount.tags[i].colour +"' id='acTag"+ loggedInAccount.tags[i].name +"'>";
        tagHTML += "<input type='image' src='Images/tick.png' style='display: none; margin-left: -48px; margin-bottom: -5px; border-radius: 5px; border-width: 0; width: 24px; height: 24px;'>";
    }

    var div = document.getElementById("acTagContainer");
    div.innerHTML = tagHTML;

    for(var i = 0; i < loggedInAccount.tags.length; i++)
    {
        var tagButton = document.getElementById("acTag" + loggedInAccount.tags[i].name);
        tagButton.onclick = function (num) {
            return function () {
                var thisButton = document.getElementById("acTag" + loggedInAccount.tags[num].name);

                if(addContactTagsSelected.indexOf(loggedInAccount.tags[num]) > -1)
                {
                    addContactTagsSelected.splice(addContactTagsSelected.indexOf(loggedInAccount.tags[num]), 1);
                    thisButton.nextSibling.style.display = "none";
                }
                else
                {
                    addContactTagsSelected.push(loggedInAccount.tags[num]);
                    thisButton.nextSibling.style.display = "inline-block";
                    console.log(tagButton.nextSibling);
                }
            }
        }(i);
    }
}

var OnClick_ConfirmAddContact = function () {
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

    var tags = [];

    for(var i = 0; i < addContactTagsSelected.length; i ++)
    {
        tags.push(new Tag(addContactTagsSelected[i].name, addContactTagsSelected[i].colour));
    }

    AddContactToAccount(loggedInAccount.value, forename.value, surname.value, addOne.value, addTwo.value, postcode.value, city.value, country.value, mobile.value, homePhone.value, email.value, false, tags);
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

var OnClick_EditContact = function (index, array) {
    editContactTagsSelected = [];
    var modal = document.getElementById("editContactModal");
    modal.style.display = "block";

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
    var isFavourite = document.getElementById("ecFavouriteIMG");

    var geoBTN = document.getElementById("ecGeoBTN");
    geoBTN.onclick = function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
            // Success Callback

                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var google_maps_pos = new google.maps.LatLng(lat, lng);

                var google_maps_geocoder = new google.maps.Geocoder();
                google_maps_geocoder.geocode(
                    { 'latLng': google_maps_pos},
                    function(results, status){
                        if(status == google.maps.GeocoderStatus.OK && results[0]){
                            addOne.value = results[0].address_components[0].long_name;
                            addOne.value += " " + results[0].address_components[1].long_name;
                            addTwo.value = results[0].address_components[2].long_name;
                            postcode.value = results[0].address_components[7].long_name;
                            city.value = results[0].address_components[4].long_name;
                            country.value = results[0].address_components[5].long_name;
                        }
                    }
                );


        },  function () {
            // Failed Callback
                console.log("Callback Failed");
        })
    }

    var contact = "";

    for(var i = 0; i < loggedInAccount.contacts.length; i++)
    {
        if(loggedInAccount.contacts[i] == array[index])
        {
            contact = loggedInAccount.contacts[i];
        }
    }

    if(contact == "")
        console.log("MAD ERROR");

    forename.value = contact.forename;
    surname.value = contact.surname;

    addOne.value = contact.addressLineOne;
    addTwo.value = contact.addressLineTwo;
    postcode.value = contact.postcode;
    city.value = contact.city;
    country.value = contact.country;

    mobile.value = contact.mobilePhone;
    homePhone.value = contact.homePhone;
    email.value = contact.email;

    if(contact.isFavourite === true)
        isFavourite.src = 'Images/favouriteFilled.png';
    else
        isFavourite.src = 'Images/favouriteBorder.png';

    isFavourite.onclick = function () {

        if(contact.isFavourite === true)
        {
            contact.isFavourite = false;
            isFavourite.src = 'Images/favouriteBorder.png';
        }
        else
        {
            contact.isFavourite = true;
            isFavourite.src = 'Images/favouriteFilled.png';
        }

    }
    
    var updateBTN = document.getElementById("updateEditContactBTN");
    updateBTN.onclick = function() {OnClick_UpdateEditContact(contact)};

    var deleteBTN = document.getElementById("deleteEditContactBTN");
    deleteBTN.onclick = function() {OnClick_DeleteEditContact(contact);}

    var tagHTML = "";
    for(var i = 0; i < loggedInAccount.tags.length; i++)
    {
        tagHTML += "<input type='button' class='InputBox' value='"+loggedInAccount.tags[i].name+"' style='display: inline-block; background-color: " + loggedInAccount.tags[i].colour +"' id='ecTag"+ loggedInAccount.tags[i].name +"'>";

        var foundTag = false;
        for(var y = 0; y < contact.tags.length; y++)
        {
            if(contact.tags[y].name === loggedInAccount.tags[i].name)
                foundTag = true;
        }

        if(!foundTag) {
            tagHTML += "<input type='image' src='Images/tick.png' style='display: none; margin-left: -48px; margin-bottom: -5px; border-radius: 5px; border-width: 0; width: 24px; height: 24px;'>";
            console.log("didnt find tag");
        }
        else {
            tagHTML += "<input type='image' src='Images/tick.png' style='display: inline-block; margin-left: -48px; margin-bottom: -5px; border-radius: 5px; border-width: 0; width: 24px; height: 24px;'>";
            editContactTagsSelected.push(loggedInAccount.tags[i]);
        }
    }

    var div = document.getElementById("ecTagContainer");
    div.innerHTML = tagHTML;

    for(var i = 0; i < loggedInAccount.tags.length; i++)
    {
        var tagButton = document.getElementById("ecTag" + loggedInAccount.tags[i].name);
        tagButton.onclick = function (num) {
            return function () {
                var thisButton = document.getElementById("ecTag" + loggedInAccount.tags[num].name);

                if(editContactTagsSelected.indexOf(loggedInAccount.tags[num]) > -1)
                {
                    editContactTagsSelected.splice(editContactTagsSelected.indexOf(loggedInAccount.tags[num]), 1);
                    thisButton.nextSibling.style.display = "none";
                }
                else
                {
                    editContactTagsSelected.push(loggedInAccount.tags[num]);
                    thisButton.nextSibling.style.display = "inline-block";
                }
            }
        }(i);
    }
}

var OnClick_UpdateEditContact = function (contact) {
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
    var isFavourite = document.getElementById("ecFavouriteIMG");

    contact.forename = forename.value;
    contact.surname = surname.value;

    contact.addressLineOne = addOne.value;
    contact.addressLineTwo = addTwo.value;
    contact.postcode = postcode.value;
    contact.city = city.value;
    contact.country = country.value;

    contact.mobilePhone = mobile.value;
    contact.homePhone = homePhone.value;
    contact.email = email.value;

    contact.tags = [];
    for(var i = 0; i < editContactTagsSelected.length; i ++)
    {
        contact.tags.push(new Tag(editContactTagsSelected[i].name, editContactTagsSelected[i].colour));
    }

    document.getElementById('editContactModal').style.display='none'

    UpdateAccountOnDatabase(loggedInAccount);
    FillOutHTML();
}

var OnClick_DeleteEditContact = function (contact) {
    var button = document.getElementById("deleteEditContactBTN");

    if(button.value == "Delete")
    {
        console.log("Poop");
        button.value = "Confirm";
    }
    else {
        console.log("Poop2");
        button.value = "Delete";
        var index = -1;

        for(var i = 0; i < loggedInAccount.contacts.length; i++)
        {
            if(loggedInAccount.contacts[i] === contact)
            {
                index = i;
            }
        }

        if(index < 0)
            console.log("ERROR");

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
    headerText.innerHTML = "Email " + loggedInAccount.contacts[index].forename + " " + loggedInAccount.contacts[index].surname;

    var sendBTN = document.getElementById("emailContact_SendBTN");
    sendBTN.onclick = function() {OnClick_SendEmail(index)};

    var cancelBTN = document.getElementById("emailContact_CancelBTN");
    cancelBTN.onclick = function() {OnClick_CancelEmail(index);}

    var to = document.getElementById("emailContact_Email");
    to.value = loggedInAccount.contacts[index].email;
}

var OnClick_SendEmail = function () {
    var to = document.getElementById("emailContact_Email");
    var subject = document.getElementById("emailContact_Subject");
    var body = document.getElementById("emailContact_Body");

    var substring = "<br/> <br/> Sent using <a href='ContactsBook/HTML/Homepage/account.html'>ContactsBook</a>";

    SendEmail(loggedInAccount.email, to.value.toString(), subject.value.toString(), body.value.toString() + substring);

    to.value = "";
    subject.value = "";
    body.value = "";
    OnClick_CancelEmail();
}

var OnClick_CancelEmail = function () {
    HideAllModals();
}

var HideAllModals = function () {
    document.getElementById('editContactModal').style.display='none'
    document.getElementById('addContactModal').style.display='none'
    document.getElementById('emailContactModal').style.display='none'
}
