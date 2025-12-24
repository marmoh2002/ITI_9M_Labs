
// Topics covered: Variables, Functions, Arrays, Objects, DOM, Events, AJAX, JSON, Timers

// Check if user is logged in
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Check authentication
const loggedInUser = getCookie('logged_in_user');
if (!loggedInUser) {
    window.location.href = 'index.html';
} else {
    document.getElementById('welcomeMessage').textContent = 'Welcome, ' + loggedInUser + '!';
}

// Logout function
function logout() {
    setCookie('logged_in_user', '', -1);
    window.location.href = 'index.html';
}

// Slider functionality using setInterval
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Create dots
const dotsContainer = document.getElementById('sliderDots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = function () { goToSlide(i); };
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = n;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function goToSlide(n) {
    showSlide(n);
}

// Auto advance slider every 4 seconds
const sliderInterval = setInterval(nextSlide, 4000);

// Fetch products from API using XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dummyjson.com/products?limit=12', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Parse JSON response
            const response = JSON.parse(xhr.responseText);
            const products = response.products;

            displayProducts(products);
        } else {
            document.getElementById('loading').textContent = 'Error loading products. Please try again later.';
        }
    }
};

xhr.send();

// Display products function
function displayProducts(products) {
    const loading = document.getElementById('loading');
    const productsGrid = document.getElementById('productsGrid');

    loading.style.display = 'none';

    // Use array methods to process and display products
    products.forEach(function (product) {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Create card HTML
    card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-category">${product.category}</p>
                </div>
            `;

    // Add click event to redirect to details page
    card.addEventListener('click', function () {
        // Store product data in sessionStorage (or could use URL parameters)
        window.location.href = 'details.html?id=' + product.id;
    });

    return card;
}
