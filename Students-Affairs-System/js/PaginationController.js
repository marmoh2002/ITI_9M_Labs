// PaginationController.js - Handles pagination logic
export class PaginationController {
    constructor(elements) {
        this.elements = elements;
        this.currentPage = 1;
        this.totalPages = 1;
        this.totalRecords = 0;
        this.pageSize = 25;
        this.onPageChange = null;
    }

    /**
     * Initialize pagination with callback
     * @param {Function} callback - Function to call when page changes
     */
    init(callback) {
        this.onPageChange = callback;
        this.setupEventListeners();
    }

    /**
     * Setup event listeners for pagination controls
     */
    setupEventListeners() {
        this.elements.firstPageBtn.addEventListener('click', () => this.goToPage(1));
        this.elements.prevPageBtn.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.elements.nextPageBtn.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.elements.lastPageBtn.addEventListener('click', () => this.goToPage(this.totalPages));

        // Use event delegation for page number buttons to avoid multiple listeners
        this.elements.pageNumbers.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-number')) {
                const page = parseInt(e.target.dataset.page);
                this.goToPage(page);
            }
        });
    }

    /**
     * Go to specific page
     * @param {number} page - Page number
     */
    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            return;
        }

        this.currentPage = page;

        if (this.onPageChange) {
            this.onPageChange(page);
        }

        this.render();
    }

    /**
     * Update pagination state
     * @param {number} totalRecords - Total number of records
     * @param {number} currentPage - Current page number
     * @param {number} pageSize - Records per page
     */
    update(totalRecords, currentPage = 1, pageSize = 25) {
        this.totalRecords = totalRecords;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalPages = Math.ceil(totalRecords / pageSize);

        this.render();
    }

    /**
     * Render pagination UI
     */
    render() {
        this.updateInfo();
        this.updateControls();
        this.updatePageNumbers();
    }

    /**
     * Update pagination info text
     */
    updateInfo() {
        const start = this.totalRecords === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.totalRecords);

        this.elements.showingStart.textContent = start;
        this.elements.showingEnd.textContent = end;
        this.elements.totalEntries.textContent = this.totalRecords;
    }

    /**
     * Update pagination control buttons state
     */
    updateControls() {
        this.elements.firstPageBtn.disabled = this.currentPage === 1;
        this.elements.prevPageBtn.disabled = this.currentPage === 1;
        this.elements.nextPageBtn.disabled = this.currentPage === this.totalPages || this.totalPages === 0;
        this.elements.lastPageBtn.disabled = this.currentPage === this.totalPages || this.totalPages === 0;
    }

    /**
     * Update page number buttons
     */
    updatePageNumbers() {
        let pageNumbersHTML = '';

        // Calculate which page numbers to show
        const maxPagesToShow = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pageNumbersHTML += this.createPageButton(1);
            if (startPage > 2) {
                pageNumbersHTML += '<span style="padding: 6px;">...</span>';
            }
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbersHTML += this.createPageButton(i);
        }

        // Add ellipsis and last page if needed
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                pageNumbersHTML += '<span style="padding: 6px;">...</span>';
            }
            pageNumbersHTML += this.createPageButton(this.totalPages);
        }

        this.elements.pageNumbers.innerHTML = pageNumbersHTML;

        // Note: Event listeners are now handled via event delegation in setupEventListeners()
        // No need to add listeners here - this prevents multiple listeners being added
    }

    /**
     * Create page number button HTML
     * @param {number} page - Page number
     * @returns {string} - HTML string
     */
    createPageButton(page) {
        const isActive = page === this.currentPage;
        return `
            <button class="page-number ${isActive ? 'active' : ''}" data-page="${page}">
                ${page}
            </button>
        `;
    }

    /**
     * Get current page
     * @returns {number} - Current page number
     */
    getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Get page size
     * @returns {number} - Page size
     */
    getPageSize() {
        return this.pageSize;
    }

    /**
     * Set page size
     * @param {number} size - New page size
     */
    setPageSize(size) {
        this.pageSize = size;
        this.currentPage = 1; // Reset to first page
    }
}