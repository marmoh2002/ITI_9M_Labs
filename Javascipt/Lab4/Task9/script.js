// script.js

// grabbing the elements i need
var exampleDiv = document.getElementById('example');
var outputDiv = document.getElementById('output');
var innerTextBtn = document.getElementById('btn-innerText');
var textContentBtn = document.getElementById('btn-textContent');

// innerText button click
innerTextBtn.addEventListener('click', function () {
    var result = exampleDiv.innerText;

    // showing what innerText returns
    outputDiv.textContent = result;

    console.log(result);
});

// textContent button click
textContentBtn.addEventListener('click', function () {
    var result = exampleDiv.textContent;

    // showing what textContent returns
    outputDiv.textContent = result;

    console.log(result);
});

