// SearchController.js - Handles search functionality
export class SearchController {
    constructor(searchInputElement) {
        this.searchInput = searchInputElement;
        this.onSearch = null;
        this.searchTimeout = null;
    }

    /**
     * Initialize search with callback
     * @param {Function} callback - Function to call when search is performed
     */
    init(callback) {
        this.onSearch = callback;
        this.setupEventListeners();
    }

    /**
     * Setup event listeners for search input
     */
    setupEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            // Debounce search - wait 500ms after user stops typing
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                if (this.onSearch) {
                    this.onSearch(query);
                }
            }, 500);
        });
    }

    /**
     * Get current search query
     * @returns {string} - Search query
     */
    getQuery() {
        return this.searchInput.value.trim();
    }

    /**
     * Clear search input
     */
    clear() {
        this.searchInput.value = '';
    }
}