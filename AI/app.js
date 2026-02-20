// ============================================================================
// QuickSort Implementation with Statistics
// ============================================================================

let comparisons = 0;
let swaps = 0;

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        comparisons++;
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    return i + 1;
}

function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// ============================================================================
// Input Parsing and Validation
// ============================================================================

function parseInput(inputStr) {
    // Split by comma or space and filter
    const numbers = inputStr
        .split(/[,\s]+/)
        .filter(str => str.trim() !== '')
        .map(str => {
            const num = parseInt(str.trim());
            return isNaN(num) ? null : num;
        });

    // Check for invalid entries
    if (numbers.includes(null)) {
        throw new Error('Invalid input: Please enter only integers separated by commas or spaces.');
    }

    if (numbers.length === 0) {
        throw new Error('Input is empty: Please enter at least one number.');
    }

    if (numbers.length > 100) {
        throw new Error('Too many numbers: Maximum 100 numbers allowed.');
    }

    return numbers;
}

// ============================================================================
// Visualization Functions
// ============================================================================

function visualizeArray(numbers, containerId, isSorted = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (numbers.length === 0) {
        container.innerHTML = '<p class="placeholder">No data to display</p>';
        return;
    }

    // Find max value for scaling
    const maxValue = Math.max(...numbers);
    const minValue = Math.min(...numbers);
    const range = maxValue - minValue || 1;

    numbers.forEach(num => {
        const bar = document.createElement('div');
        bar.className = `bar ${isSorted ? 'sorted' : ''}`;

        // Scale height between 50px and 200px
        const height = 50 + ((num - minValue) / range) * 150;
        bar.style.height = height + 'px';
        bar.textContent = num;

        bar.title = `Value: ${num}`;
        container.appendChild(bar);
    });
}

function generateRandomNumbers() {
    const count = Math.floor(Math.random() * 15) + 5; // 5-19 numbers
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    return numbers;
}

// ============================================================================
// Event Handlers
// ============================================================================

function handleSort() {
    try {
        // Clear error message
        document.getElementById('errorSection').style.display = 'none';
        document.getElementById('errorMessage').textContent = '';

        // Get and parse input
        const inputStr = document.getElementById('numberInput').value;
        const inputArray = parseInput(inputStr);

        // Make a copy for sorting
        const sortedArray = [...inputArray];

        // Reset statistics
        comparisons = 0;
        swaps = 0;

        // Measure execution time
        const startTime = performance.now();
        quickSort(sortedArray, 0, sortedArray.length - 1);
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(3);

        // Update visualizations
        visualizeArray(inputArray, 'inputVisualization', false);
        visualizeArray(sortedArray, 'outputVisualization', true);

        // Update statistics
        document.getElementById('elementCount').textContent = inputArray.length;
        document.getElementById('comparisons').textContent = comparisons.toLocaleString();
        document.getElementById('swaps').textContent = swaps.toLocaleString();
        document.getElementById('executionTime').textContent = executionTime;

        // Update result info
        document.getElementById('inputArray').textContent =
            `[${inputArray.join(', ')}]`;
        document.getElementById('sortedArray').textContent =
            `[${sortedArray.join(', ')}]`;

        // Show results and stats
        document.getElementById('statsSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('resultsSection').classList.add('fade-in');

    } catch (error) {
        // Show error message
        document.getElementById('errorSection').style.display = 'block';
        document.getElementById('errorMessage').textContent = '❌ ' + error.message;
        document.getElementById('statsSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
    }
}

function handleClear() {
    document.getElementById('numberInput').value = '';
    document.getElementById('inputVisualization').innerHTML =
        '<p class="placeholder">Enter numbers to see visualization</p>';
    document.getElementById('statsSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'none';
}

function handleRandom() {
    const randomNumbers = generateRandomNumbers();
    document.getElementById('numberInput').value = randomNumbers.join(', ');
    // Visualize the random numbers
    visualizeArray(randomNumbers, 'inputVisualization', false);
}

// ============================================================================
// Event Listeners
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
    // Button event listeners
    document.getElementById('sortBtn').addEventListener('click', handleSort);
    document.getElementById('clearBtn').addEventListener('click', handleClear);
    document.getElementById('randomBtn').addEventListener('click', handleRandom);

    // Enter key on input field
    document.getElementById('numberInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSort();
        }
    });

    // Show input visualization as user types
    document.getElementById('numberInput').addEventListener('input', function () {
        try {
            const inputStr = this.value;
            if (inputStr.trim() === '') {
                document.getElementById('inputVisualization').innerHTML =
                    '<p class="placeholder">Enter numbers to see visualization</p>';
                return;
            }
            const numbers = parseInput(inputStr);
            visualizeArray(numbers, 'inputVisualization', false);
        } catch (error) {
            // Silently handle errors while typing
        }
    });
});

// ============================================================================
// Keyboard Shortcuts
// ============================================================================

document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + Enter to sort
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSort();
    }
    // Ctrl/Cmd + L to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        handleClear();
    }
});
