
const countryInput = document.getElementById('countryInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const countryCard = document.getElementById('countryCard');

async function fetchCountryData(countryName) {
    loading.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    countryCard.classList.add('hidden');

    try {
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);

        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();
        const country = data[0];

        displayCountryData(country);
    } catch (error) {
        showError('Country not found. Please check the spelling and try again.');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayCountryData(country) {
    document.getElementById('flagImg').src = country.flag;
    document.getElementById('countryName').textContent = country.name;
    document.getElementById('countryRegion').textContent = country.region;

    const population = (country.population / 1000000).toFixed(1) + ' M People';
    document.getElementById('population').textContent = population;

    const languages = country.languages.map(lang => lang.name).join(', ');
    document.getElementById('languages').textContent = languages;

    const currency = country.currencies
        ? country.currencies.map(curr => `${curr.name} (${curr.symbol})`).join(', ')
        : 'N/A';
    document.getElementById('currency').textContent = currency;

    const capital = country.capital || 'N/A';
    document.getElementById('capital').textContent = capital;

    countryCard.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => {
    const countryName = countryInput.value.trim();
    if (countryName) {
        fetchCountryData(countryName);
    }
});

countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const countryName = countryInput.value.trim();
        if (countryName) {
            fetchCountryData(countryName);
        }
    }
});
