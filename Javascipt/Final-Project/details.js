// Get breed from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const breed = urlParams.get('breed');

if (!breed) {
    document.getElementById('loading').textContent = 'No breed selected.';
} else {
    // Fetch breed details
    fetchBreedDetails(breed);
}

function fetchBreedDetails(breed) {
    // Fetch multiple images for the breed
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                displayBreedDetails(breed, response.message);
            } else {
                document.getElementById('loading').textContent = 'Error loading breed. Please try again.';
            }
        }
    };

    xhr.send();
}

function displayBreedDetails(breed, images) {
    const loading = document.getElementById('loading');
    const detailsContainer = document.getElementById('productDetails');

    loading.style.display = 'none';
    detailsContainer.style.display = 'block';

    // Take up to 6 images
    const displayImages = images.slice(0, 6);

    // Format breed name
    const breedTitle = breed.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // Generate random rating
    const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '½';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }


    // Create thumbnails HTML
    let thumbnailsHTML = '';
    displayImages.forEach(function (img, index) {
        thumbnailsHTML += `<img src="${img}" alt="${breedTitle} ${index + 1}" 
                    class="thumbnail ${index === 0 ? 'active' : ''}" 
                    onclick="changeMainImage('${img}', this)">`;
    });

    // Generate random reviews
    const reviewerNames = ['Sarah M.', 'John D.', 'Emily R.', 'Michael B.', 'Lisa K.'];
    const reviewComments = [
        'Absolutely wonderful breed! Very friendly and loyal.',
        'Perfect family dog. Gets along great with kids.',
        'Beautiful and intelligent. Highly recommend!',
        'Amazing temperament and easy to train.',
        'Love this breed! So playful and energetic.'
    ];

    let reviewsHTML = '';
    const numReviews = Math.floor(Math.random() * 3) + 2; // 2-4 reviews
    for (let i = 0; i < numReviews; i++) {
        const reviewRating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
        const reviewStars = '★'.repeat(reviewRating) + '☆'.repeat(5 - reviewRating);
        reviewsHTML += `
            <div class="review">
                <div class="review-header">
                    <span class="reviewer-name">${reviewerNames[i]}</span>
                    <span class="review-rating">${reviewStars}</span>
                </div>
                <p class="review-comment">${reviewComments[i]}</p>
            </div>
        `;
    }

    // Breed descriptions
    const descriptions = {
        'default': 'A wonderful dog breed known for its unique characteristics and loyal nature. Makes an excellent companion for families and individuals alike.'
    };

    const description = descriptions[breed] || descriptions['default'];

    // Build complete HTML
    detailsContainer.innerHTML = `
        <div class="product-layout">
            <div class="product-images">
                <img src="${displayImages[0]}" alt="${breedTitle}" class="main-image" id="mainImage">
                <div class="thumbnail-container">
                    ${thumbnailsHTML}
                </div>
            </div>
            
            <div class="product-info">
                <h2>${breedTitle}</h2>
                <span class="category-badge">Dog Breed</span>
                
                <div class="rating">
                    <span class="stars">${starsHTML}</span>
                    <span>${rating} / 5.0</span>
                </div>
            
                
                <p class="description">${description}</p>
                
                <div class="product-meta">
                    <div class="meta-row">
                        <span class="meta-label">Breed:</span>
                        <span class="meta-value">${breedTitle}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Type:</span>
                        <span class="meta-value">Purebred</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Temperament:</span>
                        <span class="meta-value">Friendly, Loyal, Energetic</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Life Span:</span>
                        <span class="meta-value">10-15 years</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Care Level:</span>
                        <span class="meta-value">Moderate</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Good with:</span>
                        <span class="meta-value">Families, Children, Other Pets</span>
                    </div>
                </div>
            </div>
        </div>
        
        ${reviewsHTML ? `
            <div class="reviews-section">
                <h3>Owner Reviews</h3>
                ${reviewsHTML}
            </div>
        ` : ''}
    `;
}

// Function to change main image when thumbnail is clicked
function changeMainImage(imgSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imgSrc;

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function (thumb) {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}