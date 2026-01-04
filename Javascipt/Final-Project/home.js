// Home page JavaScript
// Shows dog breeds after user logs in

// Cookie functions (copied from login page)
function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
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
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Check if user is logged in
let loggedInUser = getCookie('logged_in_user');
if (!loggedInUser) {
    // Not logged in, go back to login page
    window.location.href = 'index.html';
} else {
    // Show username
    document.getElementById('welcomeMessage').textContent = 'Welcome, ' + loggedInUser + '!';
}

// Logout function
function logout() {
    setCookie('logged_in_user', '', -1);
    window.location.href = 'index.html';
}

// Slider code
let currentSlide = 0;
let slides = document.querySelectorAll('.slide');
let totalSlides = slides.length;

// Create dots for slider
let dotsContainer = document.getElementById('sliderDots');
for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) {
        dot.className = 'dot active';
    }
    dot.onclick = function () {
        goToSlide(i);
    };
    dotsContainer.appendChild(dot);
}

let dots = document.querySelectorAll('.dot');

// Show specific slide
function showSlide(n) {
    // Remove active class from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    currentSlide = n;

    // Loop around if needed
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Go to next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Go to specific slide (for dot clicks)
function goToSlide(n) {
    showSlide(n);
}

// Auto advance slider every 4 seconds
let sliderInterval = setInterval(nextSlide, 4000);

// Fetch dog breeds
let allDogs = [];

// Get list of all breeds first
let breedsXhr = new XMLHttpRequest();
breedsXhr.open('GET', 'https://dog.ceo/api/breeds/list/all', true);

breedsXhr.onreadystatechange = function () {
    if (breedsXhr.readyState === 4) {
        if (breedsXhr.status === 200) {
            let response = JSON.parse(breedsXhr.responseText);
            let breeds = response.message;

            // Get breed names (just take first 12)
            let breedNames = Object.keys(breeds);
            let first12Breeds = breedNames.slice(0, 12);

            // Get images for each breed
            fetchDogImages(first12Breeds);
        } else {
            document.getElementById('loading').textContent = 'Error loading dogs. Please try again later.';
        }
    }
};

breedsXhr.send();

// Fetch images for each breed
function fetchDogImages(breedNames) {
    let completed = 0;

    for (let i = 0; i < breedNames.length; i++) {
        let breed = breedNames[i];

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);

                    // Create dog object
                    let dogObj = {
                        id: breed,
                        breed: breed,
                        image: response.message,
                        title: breed.charAt(0).toUpperCase() + breed.slice(1),
                        category: 'Dog Breed'
                    };

                    allDogs.push(dogObj);
                }

                completed++;

                // When all are done, display them
                if (completed === breedNames.length) {
                    displayProducts(allDogs);
                }
            }
        };

        xhr.send();
    }
}

// Display all the dog cards
function displayProducts(dogs) {
    let loading = document.getElementById('loading');
    let productsGrid = document.getElementById('productsGrid');

    loading.style.display = 'none';

    // Create card for each dog
    for (let i = 0; i < dogs.length; i++) {
        let dog = dogs[i];
        let card = createProductCard(dog);
        productsGrid.appendChild(card);
    }
}

// Create a single product card
function createProductCard(dog) {
    let card = document.createElement('div');
    card.className = 'product-card';

    // Build HTML for card
    let html = '';
    html += '<img src="' + dog.image + '" alt="' + dog.title + '" class="product-image">';
    html += '<div class="product-info">';
    html += '<h3 class="product-title">' + dog.title + '</h3>';
    html += '<p class="product-category">' + dog.category + '</p>';
    html += '</div>';

    card.innerHTML = html;

    // Add click event to go to details page
    card.addEventListener('click', function () {
        window.location.href = 'details.html?breed=' + dog.breed;
    });

    return card;
}