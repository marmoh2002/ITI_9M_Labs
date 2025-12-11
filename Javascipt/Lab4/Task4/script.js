// textStyle.js

// get the paragraph element
var paragraph = document.getElementById("para");

// function to change font family
function changeFontFamily(fontName) {
    paragraph.style.fontFamily = fontName;
}

// function for text alignment
function changeTextAlign(alignment) {
    paragraph.style.textAlign = alignment;
}

// line height function
function changeLineHeight(height) {
    paragraph.style.lineHeight = height;
}

// letter spacing
function changeLetterSpacing(spacing) {
    paragraph.style.letterSpacing = spacing;
}

// text indent function
function changeTextIndent(indent) {
    paragraph.style.textIndent = indent;
}

// text transform (uppercase, lowercase, etc)
function changeTextTransform(transform) {
    paragraph.style.textTransform = transform;
}

// text decoration like underline
function changeTextDecoration(decoration) {
    paragraph.style.textDecoration = decoration;
}