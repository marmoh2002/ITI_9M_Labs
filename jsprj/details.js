// Topics covered: DOM, Objects, Arrays, String methods, URL parameters, AJAX, JSON

// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
    document.getElementById('loading').textContent = 'No product selected.';
} else {
    // Fetch product details
    fetchProductDetails(productId);
}

function fetchProductDetails(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dummyjson.com/products/' + id, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const product = JSON.parse(xhr.responseText);
                displayProductDetails(product);
            } else {
                document.getElementById('loading').textContent = 'Error loading product. Please try again.';
            }
        }
    };

    xhr.send();
}

function displayProductDetails(product) {
    const loading = document.getElementById('loading');
    const detailsContainer = document.getElementById('productDetails');

    loading.style.display = 'none';
    detailsContainer.style.display = 'block';

    // Generate stars for rating
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '⯨';
    }
    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }

    // Determine stock status
    let stockClass = product.stock > 20 ? 'in-stock' : 'low-stock';
    let stockText = product.stock > 20 ?
        `In Stock (${product.stock} available)` :
        `Low Stock - Only ${product.stock} left!`;

    // Create thumbnails HTML
    let thumbnailsHTML = '';
    if (product.images && product.images.length > 0) {
        product.images.forEach(function (img, index) {
            thumbnailsHTML += `<img src="${img}" alt="Product ${index + 1}" 
                        class="thumbnail ${index === 0 ? 'active' : ''}" 
                        onclick="changeMainImage('${img}', this)">`;
        });
    }

    // Create reviews HTML
    let reviewsHTML = '';
    if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach(function (review) {
            const reviewStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            reviewsHTML += `
                        <div class="review">
                            <div class="review-header">
                                <span class="reviewer-name">${review.reviewerName}</span>
                                <span class="review-rating">${reviewStars}</span>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `;
        });
    }

    // Build complete HTML
    detailsContainer.innerHTML = `
                <div class="product-layout">
                    <div class="product-images">
                        <img src="${product.images[0]}" alt="${product.title}" class="main-image" id="mainImage">
                        <div class="thumbnail-container">
                            ${thumbnailsHTML}
                        </div>
                    </div>
                    
                    <div class="product-info">
                        <h2>${product.title}</h2>
                        <span class="category-badge">${product.category}</span>
                        
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <div class="discount">Save ${product.discountPercentage}%!</div>
                        
                        <div class="rating">
                            <span class="stars">${starsHTML}</span>
                            <span>${product.rating.toFixed(1)} / 5.0</span>
                        </div>
                        
                        <div class="stock ${stockClass}">${stockText}</div>
                        
                        <p class="description">${product.description}</p>
                        
                        <div class="product-meta">
                            <div class="meta-row">
                                <span class="meta-label">Brand:</span>
                                <span class="meta-value">${product.brand || 'N/A'}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">SKU:</span>
                                <span class="meta-value">${product.sku}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Weight:</span>
                                <span class="meta-value">${product.weight} g</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Warranty:</span>
                                <span class="meta-value">${product.warrantyInformation}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Shipping:</span>
                                <span class="meta-value">${product.shippingInformation}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Return Policy:</span>
                                <span class="meta-value">${product.returnPolicy}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${reviewsHTML ? `
                    <div class="reviews-section">
                        <h3>Customer Reviews</h3>
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
