self.onmessage = () => {
    let totalValue = 0;

    // Using 'counter' instead of 'i'
    for (let counter = 0; counter < 1000000000; counter++) {
        totalValue += counter;
    }

    self.postMessage(totalValue);
};