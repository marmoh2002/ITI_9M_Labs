const container = document.querySelector('.container');

// Helper function to render HTML, keeping the fetch logic clean
// Modeled after the "display" requirement in Lab3 [cite: 4]
const renderCountry = (data, className = '') => {
    const html = `
        <article class="country-card ${className}">
            <img class="country-img" src="${data.flag}" />
            <div class="country-data">
                <h3 class="country-name">${data.name}</h3>
                <h4 class="region">${data.region}</h4>
                <div class="data-row">
                    <span>wb_sunny</span> <span>${(data.population / 1000000).toFixed(1)} M People</span>
                </div>
                <div class="data-row">
                    <span>mic</span> <span>${data.languages[0].name}</span>
                </div>
                <div class="data-row">
                    <span>paid</span> <span>${data.currencies[0].name}</span>
                </div>
            </div>
        </article>
    `;

    container.insertAdjacentHTML('beforeend', html);
};

// Main Function inspired by "getAllStudents" in StudentWithPromise.js
const getCountryData = function (countryName) {

    // Task 1: Fetch Country by Name [cite: 3]
    fetch(`https://restcountries.com/v2/name/${countryName}`)
        .then(response => {
            // Error handling similar to StudentWithPromise.js catch logic
            if (!response.ok) throw new Error(`Country not found (${response.status})`);
            return response.json();
        })
        .then(data => {
            // Render Country 1
            renderCountry(data[0]);

            // Task 2: Chaining Promise for Neighbor 
            // "dynamically called from the value... returned from the Country promise" 
            const neighbour = data[0].borders?.[0]; // Get the first neighbor code

            if (!neighbour) throw new Error('No neighbour found!');

            // Return the new fetch promise to chain it
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(response => {
            if (!response.ok) throw new Error(`Neighbour not found (${response.status})`);
            return response.json();
        })
        .then(data => {
            // Render Country 2 (Neighbour)
            renderCountry(data, 'neighbour');
        })
        .catch(err => {
            console.error(`Something went wrong: ${err.message}`);
        });
};

// Execute the function
getCountryData('egypt');