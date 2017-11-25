function duplicates() {
    var array = new array();
    for (i=0; i < loggedInAccount.contacts.length; i++){
        if (loggedInAccount.contacts[i].mobilePhone==array[i,0].mobilePhone){
            array[i,0]=loggedInAccount.contacts[i];
            array[i,1]=array[i,1]+1;
        }
        else {
            array[i,0]=loggedInAccount.contacts[i];
            array[i,1]=1;
        }
    }
}

