// TOPIC 2: Arrays
const sliderImages = [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png",
    "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png"
];

let currentIndex = 0;
const imgElement = document.getElementById("sliderImg");

// TOPIC 4: Timers (setInterval)
function startSlider() {
    imgElement.src = sliderImages[0]; // Initialize
    setInterval(() => {
        currentIndex++;
        if (currentIndex >= sliderImages.length) {
            currentIndex = 0;
        }
        imgElement.src = sliderImages[currentIndex];
    }, 2000); // Change every 2 seconds
}

// TOPIC 4: AJAX & Networking (XMLHttpRequest)
function fetchProducts() {
    const xhr = new XMLHttpRequest();
    // Using DummyJSON API
    xhr.open("GET", "https://dummyjson.com/products?limit=10");

    xhr.onreadystatechange = function () {
        // Checking state and status
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText); // TOPIC 4: JSON Parsing
            const products = response.products;
            renderCards(products);
        }
    };
    xhr.send();
}

// TOPIC 3: DOM Creation & Manipulation
function renderCards(items) {
    const container = document.getElementById("cards-container");

    // TOPIC 2: High-Order Methods (map/forEach)
    items.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card"); // Changing classes

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
        `;

        // Redirect to details page on click
        card.addEventListener("click", function () {
            // Passing ID via URL query parameter
            window.location.href = `details.html?id=${product.id}`;
        });

        container.appendChild(card);
    });
}

// Initialize
startSlider();
fetchProducts();