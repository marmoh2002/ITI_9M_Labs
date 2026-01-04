// array of image objects with name and description
const images = [
    {
        src: "photos/cat1.jpg",
        description: "first cat"
    },
    {
        src: "photos/cat2.jpg",
        description: "second cat"
    },
    {
        src: "photos/cat3.jpg",
        description: "third cat"
    },
    {
        src: "photos/cat4.jpg",
        description: "fourth cat"
    }
];

// current image index
let currentIndex = 0;

// DOM elements
const CatImage = document.getElementById("CatImage");
const imageDescription = document.getElementById("imageDescription");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// display image based on index
function displayImage(index) {
    CatImage.setAttribute("src", images[index].src);
    imageDescription.textContent = images[index].description;
}

// show first image on page load
displayImage(currentIndex);

// next button handler
nextBtn.addEventListener("click", function () {
    currentIndex++;

    // loop back to first image if at the end
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    displayImage(currentIndex);
});

// prev button handler
prevBtn.addEventListener("click", function () {
    currentIndex--;

    // loop to last image if at the beginning
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    displayImage(currentIndex);
});