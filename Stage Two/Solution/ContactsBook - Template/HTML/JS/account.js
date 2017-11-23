// Javascript functions directly used with the account.html page

window.onload = function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btnAddContact");
    btn.onclick = function () {
        modal.style.display = "block";
        console.log("boop");
    }
}