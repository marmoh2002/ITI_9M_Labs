// --- PART 1: SLIDER ---
var sliderDiv = document.getElementById("slider");
var slides = ["Image 1", "Image 2", "Image 3", "Image 4"]; // Could be URLs
var index = 0;

setInterval(function () {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    sliderDiv.innerText = slides[index]; // Or change sliderDiv.style.backgroundImage
}, 2000); // Change every 2 seconds


// --- PART 2: API (XMLHttpRequest) ---
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var products = response.products;
        var container = document.getElementById("cards-container");

        // Loop through products and create cards
        for (var i = 0; i < products.length; i++) {
            var product = products[i];

            // Create Card Element
            var card = document.createElement("div");
            card.style.border = "1px solid black";
            card.style.padding = "10px";
            card.style.cursor = "pointer";

            // Add Content
            card.innerHTML = "<h3>" + product.title + "</h3><p>$" + product.price + "</p>";

            // Click Event -> Redirect to Details with ID
            // We use a Closure or let (if ES6 allowed) or setAttribute to store ID
            card.setAttribute("data-id", product.id);
            card.addEventListener("click", function (e) {
                // 'this' refers to the card element
                var id = this.getAttribute("data-id");
                window.location.href = "details.html?id=" + id;
            });

            container.appendChild(card);
        }
    }
};

xhr.send();