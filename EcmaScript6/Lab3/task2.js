const countryInput = document.getElementById('countryInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const cardsContainer = document.getElementById('cardsContainer');

function createCountryCard(country, label) {
    const population = (country.population / 1000000).toFixed(1) + ' M People';
    const languages = country.languages.map(lang => lang.name).join(', ');
    const currency = country.currencies
        ? country.currencies.map(curr => curr.name).join(', ')
        : 'N/A';

    return `
                <div class="country-card">
                    ${label ? `<div class="card-header">${label}</div>` : ''}
                    <div class="flag-container">
                        <img src="${country.flag}" alt="${country.name} Flag">
                    </div>
                    <div class="country-info">
                        <div class="country-name">${country.name}</div>
                        <div class="country-region">${country.region}</div>
                        
                        <div class="info-item">
                            <span class="icon">👥</span>
                            <span class="info-text">${population}</span>
                        </div>
                        
                        <div class="info-item">
                            <span class="icon">🗣️</span>
                            <span class="info-text">${languages}</span>
                        </div>
                        
                        <div class="info-item">
                            <span class="icon">💰</span>
                            <span class="info-text">${currency}</span>
                        </div>
                    </div>
                </div>
            `;
}

// Promise chaining implementation
function fetchCountryAndNeighbor(countryName) {
    loading.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    cardsContainer.classList.add('hidden');
    cardsContainer.innerHTML = '';

    // First promise: fetch the main country
    fetch(`https://restcountries.com/v2/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];

            // Display the main country
            cardsContainer.innerHTML = createCountryCard(country, '');
            cardsContainer.classList.remove('hidden');

            // Check if country has borders (neighbors)
            if (!country.borders || country.borders.length === 0) {
                throw new Error('This country has no neighbors');
            }

            // Get a neighbor's alpha code (skip Israel for Egypt)
            let neighborCode = country.borders[0];

            // For Egypt, find Libya instead
            if (country.name.toLowerCase() === 'egypt') {
                const libyaCode = country.borders.find(code => code === 'LBY');
                if (libyaCode) {
                    neighborCode = libyaCode;
                }
            }

            // Return a new promise to fetch the neighbor
            // This is the chaining part - one promise depends on another
            return fetch(`https://restcountries.com/v2/alpha/${neighborCode}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Neighbor country not found');
            }
            return response.json();
        })
        .then(neighborCountry => {
            // Add the neighbor country card
            cardsContainer.innerHTML += createCountryCard(neighborCountry, 'NEIGHBOUR COUNTRY');
        })
        .catch(error => {
            showError(error.message || 'An error occurred. Please try again.');
        })
        .finally(() => {
            loading.classList.add('hidden');
        });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => {
    const countryName = countryInput.value.trim();
    if (countryName) {
        fetchCountryAndNeighbor(countryName);
    }
});

countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const countryName = countryInput.value.trim();
        if (countryName) {
            fetchCountryAndNeighbor(countryName);
        }
    }
});
