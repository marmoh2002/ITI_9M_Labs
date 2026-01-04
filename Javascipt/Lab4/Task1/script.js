// Get reference to the div
const container = document.getElementById("imageContainer");

// Variable to store our image reference
let myImage = null;

// Add Image Button
document.getElementById("addBtn").addEventListener("click", function () {

    // Step 1: Create image node
    myImage = document.createElement("img");

    // Step 2: Set source using setAttribute
    myImage.setAttribute("src", "https://via.placeholder.com/150");
    myImage.setAttribute("alt", "Placeholder Image");
    myImage.setAttribute("id", "myNewImage");

    // Step 3a: Append using appendChild()
    // Adds the image at the END of the div
    container.appendChild(myImage);

    // Step 4: Alert number of child nodes
    alert("Number of child nodes: " + container.childNodes.length);

    console.log("Child nodes:", container.childNodes);
});

// Remove Image Button
document.getElementById("removeBtn").addEventListener("click", function () {

    // Step 5: Remove the image
    if (myImage && myImage.parentNode) {
        container.removeChild(myImage);
        alert("Image removed!");
    } else {
        alert("No image to remove!");
    }
});

// insertBefore example - adds element before a specified node
// Syntax: parentNode.insertBefore(newNode, referenceNode)
const existingParagraph = container.querySelector("p");
container.insertBefore(myImage, existingParagraph);

// appendChild vs insertBefore:
// appendChild - adds at end, takes 1 argument
// insertBefore - adds before reference node, takes 2 arguments

// childNodes.length returns more than expected because
// it counts text nodes (whitespace, line breaks) not just elements
// use children.length to count only element nodes

