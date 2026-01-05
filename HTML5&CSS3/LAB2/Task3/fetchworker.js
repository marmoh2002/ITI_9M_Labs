self.onmessage = () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    fetch(apiUrl)
        .then(apiResponse => apiResponse.json())
        .then(jsonResult => {
            self.postMessage(jsonResult);
        })
        .catch(error => {
            // Good practice to handle errors, even simply
            console.error("Fetch error:", error);
        });
};