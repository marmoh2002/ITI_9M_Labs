// 1. Get ID from URL
// URL is like: details.html?id=5
var params = new URLSearchParams(window.location.search);
var productId = params.get("id");

if (productId) {
    // 2. Fetch specific product
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dummyjson.com/products/" + productId);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var product = JSON.parse(xhr.responseText);

            // Display Data
            document.body.innerHTML += "<h1>" + product.title + "</h1>";
            document.body.innerHTML += "<p>" + product.description + "</p>";
            document.body.innerHTML += "<img src='" + product.thumbnail + "' width='200'>";

            // Back Button
            var backBtn = document.createElement("button");
            backBtn.innerText = "Back to Home";
            backBtn.addEventListener("click", function () {
                window.history.back(); // Or window.location.href = 'home.html'
            });
            document.body.appendChild(backBtn);
        }
    };
    xhr.send();
} else {
    document.body.innerText = "No Product Found";
}