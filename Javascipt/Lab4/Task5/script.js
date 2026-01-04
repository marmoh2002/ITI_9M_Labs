let img = document.querySelector("#header img");
let navDiv = document.getElementById("navigation");
let header = document.getElementById("header");

img.addEventListener("click", function () {

    // add a class to center the text and fix bullets
    navDiv.classList.add("center-nav");

    // add a class to resize the image
    img.classList.add("small-img");

    // clone the image
    let clonedImg = img.cloneNode(true);

    // Add the class to move the header content to the right
    header.classList.add("header-right");

    // Append the cloned image to the body
    document.body.appendChild(clonedImg);
}, { once: true });