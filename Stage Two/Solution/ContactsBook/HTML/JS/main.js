var loggedInAccount;    // The account that is currently Logged in

var Account = function (username, email, password, securityText) {
    if(!username)
        this.username = "NewUser";
    else this.username = username;

    if(!email)
        this.email = "NewEmail";
    else this.email = email;

    if(!password)
        this.password = "NewPassword";
    else this.password = password;

    if(!securityText)
        this.securityText = "NewSecurity";
    else this.securityText = securityText;

    this.tags = [];
    this.contacts = [];
}

var Contact = function (forename, surname, addOne, addTwo, postcode, city, country, mobilePhone, homePhone, email, isFavourite, tags) {
    this.forename = forename;
    this.surname = surname;
    this.addressLineOne = addOne;
    this.addressLineTwo = addTwo;
    this.postcode = postcode;
    this.city = city;
    this.country = country;
    this.mobilePhone = mobilePhone;
    this.homePhone = homePhone;
    this.email = email;
    this.isFavourite = isFavourite;
    this.tags = tags;
}

var Tag = function (name, color) {
    this.name = name;

    if(color)
        this.colour = color;
    else
        this.colour = "#60FD36";
}

var AddContactToAccount = function (account, forename, surname, addOne, addTwo, postcode, city, country, mobilePhone, homePhone, email, isFavourite, tags) {
    if(!loggedInAccount)
        return;

    if(!forename)
        forename = "P.";

    if(!surname)
        surname = "Sherman";

    if(!addOne)
        addOne = "42 Wallaby Way";

    if(!addTwo)
        addTwo = "Sydney";

    if(!postcode)
        postcode = "2000";

    if(!city)
        city = "Sydney";

    if(!country)
        country = "Australia";

    if(!mobilePhone)
        mobilePhone = "07852925503";

    if(!homePhone)
        homePhone = "01475796558";

    if(!email)
        email = "p.sherman@edu.nsw.au";

    if(!tags)
        tags = [];

    var newContact = new Contact(forename, surname, addOne, addTwo, postcode, city, country, mobilePhone, homePhone, email, isFavourite, tags);
    loggedInAccount.contacts.push(newContact);
}

var AddTagToAccount = function(account, tag)
{
    account.tags.push(tag);
}

var AddTagToContact = function(index, tag)
{
    loggedInAccount.contacts[index].tags.push(tag);
}

var AddAccountToDatabase = function (_accountToAdd) {
    if(!_accountToAdd)
        return;

    // Pull database
    firebase.database().ref("accounts/").once("value").then(function (snapshot)
    {
        var foundMatchingUser = false;
        var foundMatchingEmail = false;
        var matchingUser = "";

        // Loop through each child Account of the database
        snapshot.forEach(function (child) {

            // Store the child's data
            var newItemValue = JSON.parse(child.val());

            // Check the username does not exist
            if(newItemValue.username.toString().toLowerCase() === _accountToAdd.username.toString().toLowerCase()) {
                foundMatchingUser = true;
                matchingUser = newItemValue;
            }

            // Check the email does not exist
            if(newItemValue.email.toString().toLowerCase() === _accountToAdd.email.toString().toLowerCase())
            {
                foundMatchingEmail = true;
                matchingUser = newItemValue;
            }
        });

        if(foundMatchingUser)           // The username matched one that is already in the database
        {
            console.log("Username Exists");
            return "Username Exists";
        }
        else if(foundMatchingEmail)     // The email matched one that is already in the database
        {
            console.log("Email Exists");
            return "Email Exists";
        }
        else                            // There are no matches in the database, create the account
        {
            var Json = JSON.stringify(_accountToAdd);
            firebase.database().ref("accounts/" + _accountToAdd.username.toString()).set(Json);
            console.log("Created Account");
            return "Created Account";
        }
    })
}

var UpdateAccountOnDatabase = function(_accountToUpdate)
{
    if(!_accountToUpdate)
        return;

    var Json = JSON.stringify(_accountToUpdate);
    firebase.database().ref("accounts/" + _accountToUpdate.username.toString()).set(Json);
}

var FindAccountByUsername = function(username)
{
    firebase.database().ref("accounts/").once("value").then(function (snapshot) {
        // Loop through each child Account of the database
        snapshot.forEach(function (child) {
            // Store the child's data

            var newItemValue = JSON.parse(child.val());
            console.log("BOOP" + newItemValue);

            // Check the username does not exist
            if (newItemValue.username.toString().toLowerCase() === username.toString().toLowerCase()) {
                var account = newItemValue;
                return account;
            }
        });
    })
}

var LoadAccountPage = function (username) {
    document.location.href="Homepage/account.html?name=" + username.toString();
}

var Login = function (username) {
    firebase.database().ref("accounts/").once("value").then(function (snapshot) {
        var foundUser = false;

        // Loop through each child Account of the database
        snapshot.forEach(function (child) {
            // Store the child's data

            var newItemValue = JSON.parse(child.val());

            // Check the username exists
            if (newItemValue.username.toString().toLowerCase() === username.toString().toLowerCase()) {
                var account = newItemValue;
                loggedInAccount = account;
                OnLoginSuccess();
                foundUser  = true;
            }
        });

        if(!foundUser)
        {
            console.log("ERROR LOGGING IN");
        }
    })
}

var SendEmail = function (from, to, subject, body) {
    emailjs.send("gmail", "template_51qiAK6f", {"send_to":to,"from_email":from,"from_name":subject,"message_html":body});
}