// B.1

document.addEventListener('keydown', function (e) {
    // key gives character/name, code gives physical key
    let keyName = e.key;
    let keyCode = e.code;

    // check for modifier keys
    let modifierKey = '';

    if (e.altKey) {
        modifierKey = 'Alt key';
    }
    else if (e.ctrlKey) {
        modifierKey = 'Ctrl key';
    }
    else if (e.shiftKey) {
        modifierKey = 'Shift key';
    }

    // build the message
    let message = 'Key: ' + keyName + '\nCode: ' + keyCode;

    if (modifierKey !== '') {
        message += '\nModifier: ' + modifierKey + ' is pressed';
    }

    alert(message);
});



// B.2 

document.addEventListener('contextmenu', function (e) {
    // stops the default behavior which is showing the menu
    e.preventDefault();

    // just to show it works
    alert('right click blocked');
});