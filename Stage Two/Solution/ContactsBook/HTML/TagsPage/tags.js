window.onload = function () {
    var addTagBTN = document.getElementById("addTag_BTN");
    addTagBTN.onclick = function () {
        OnClick_AddTagButton();
    }

    var confirmAddTagBTN = document.getElementById("confirmAddTag_BTN");
    confirmAddTagBTN.onclick = function () {
        OnClick_ConfirmAddTag();
    }

    var cancelAddTagBTN = document.getElementById("cancelAddTag_BTN");
    cancelAddTagBTN.onclick = function () {
        OnClick_CancelAddTag();
    }
}

var currentColour;

var OnClick_AddTagButton = function () {
    document.getElementById("addTagModal").style.display = "block";
    var lightRed = document.getElementById("newTagColour_LightRed");
    var darkRed = document.getElementById("newTagColour_DarkRed");

    var lightBlue = document.getElementById("newTagColour_LightBlue");
    var darkBlue = document.getElementById("newTagColour_DarkBlue");

    var lightGreen = document.getElementById("newTagColour_LightGreen");
    var darkGreen = document.getElementById("newTagColour_DarkGreen");

    var lightOrange = document.getElementById("newTagColour_LightOrange");
    var darkOrange = document.getElementById("newTagColour_DarkOrange");

    var lightYellow = document.getElementById("newTagColour_LightYellow");
    var darkYellow = document.getElementById("newTagColour_DarkYellow");

    var all = [];
    all.push(lightRed, darkRed, lightBlue, darkBlue, lightGreen, darkGreen, lightOrange, darkOrange, lightYellow, darkYellow);

    var UntickAll = function () {
        for(var i = 0; i < all.length; i++)
        {
            all[i].nextSibling.nextSibling.style.display = "none";
        }
    }

    UntickAll();

    lightBlue.nextSibling.nextSibling.style.display = "inline-block";
    currentColour = lightBlue.style.backgroundColor;

    lightRed.onclick = function () {
        UntickAll();
        lightRed.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = lightRed.style.backgroundColor;
    }

    darkRed.onclick = function () {
        UntickAll();
        darkRed.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = darkRed.style.backgroundColor;
    }

    lightBlue.onclick = function () {
        UntickAll();
        lightBlue.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = lightBlue.style.backgroundColor;
    }

    darkBlue.onclick = function () {
        UntickAll();
        darkBlue.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = darkBlue.style.backgroundColor;
    }

    lightGreen.onclick = function () {
        UntickAll();
        lightGreen.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = lightGreen.style.backgroundColor;
    }

    darkGreen.onclick = function () {
        UntickAll();
        darkGreen.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = darkGreen.style.backgroundColor;
    }

    lightOrange.onclick = function () {
        UntickAll();
        lightOrange.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = lightOrange.style.backgroundColor;
    }

    darkOrange.onclick = function () {
        UntickAll();
        darkOrange.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = darkOrange.style.backgroundColor;
    }

    lightYellow.onclick = function () {
        UntickAll();
        lightYellow.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = lightYellow.style.backgroundColor;
    }

    darkYellow.onclick = function () {
        UntickAll();
        darkYellow.nextSibling.nextSibling.style.display = "inline-block";
        currentColour = darkYellow.style.backgroundColor;
    }

}

var OnClick_ConfirmAddTag = function () {
    var textField = document.getElementById("addTag_Name");
    var rgb = currentColour.match(/\d+/g);

    var tag = new Tag(textField.value.toString(), rgbToHex(rgb[0], rgb[1], rgb[2]));

    console.log(tag);
}

var OnClick_CancelAddTag = function () {
    document.getElementById("addTagModal").style.display = "none";
}

function rgbToHex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}