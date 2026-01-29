// DataManager.js - Main controller class that coordinates everything
import { ApiService } from './ApiService.js';
import { EntityConfig } from './EntityConfig.js';
import { TableRenderer } from './TableRenderer.js';
import { PaginationController } from './PaginationController.js';
import { FormHandler } from './FormHandler.js';
import { SearchController } from './SearchController.js';

export class DataManager {
    constructor() {
        this.apiService = new ApiService();

        // Default state
        this.currentEntity = 'students';
        this.currentSort = { field: null, order: 'asc' };
        this.currentSearch = '';

        // State persistence key
        this.stateKey = 'sas_app_state';

        // Initialize components
        this.initializeComponents();
    }

    /**
     * Initialize all components
     */
    initializeComponents() {
        // Table renderer
        this.tableRenderer = new TableRenderer(
            document.getElementById('tableHead'),
            document.getElementById('tableBody')
        );

        // Pagination controller
        this.paginationController = new PaginationController({
            firstPageBtn: document.getElementById('firstPageBtn'),
            prevPageBtn: document.getElementById('prevPageBtn'),
            nextPageBtn: document.getElementById('nextPageBtn'),
            lastPageBtn: document.getElementById('lastPageBtn'),
            pageNumbers: document.getElementById('pageNumbers'),
            showingStart: document.getElementById('showingStart'),
            showingEnd: document.getElementById('showingEnd'),
            totalEntries: document.getElementById('totalEntries')
        });

        // Form handler
        this.formHandler = new FormHandler(
            document.getElementById('modal'),
            document.getElementById('dataForm'),
            document.getElementById('formFields'),
            document.getElementById('modalTitle')
        );

        // Search controller
        this.searchController = new SearchController(
            document.getElementById('searchInput')
        );

        // Initialize components callbacks
        this.paginationController.init((page) => {
            this.loadData();
        });

        this.formHandler.init();

        this.searchController.init((query) => {
            this.currentSearch = query;
            this.paginationController.currentPage = 1; // Reset to first page on search
            this.loadData();
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Only switch if it's a different entity
                if (this.currentEntity !== btn.dataset.entity) {
                    this.switchEntity(btn.dataset.entity);
                }
            });
        });

        // Entries per page
        document.getElementById('entriesPerPage').addEventListener('change', (e) => {
            const pageSize = parseInt(e.target.value);
            this.paginationController.setPageSize(pageSize);
            this.loadData();
        });

        // Add new button
        document.getElementById('addNewBtn').addEventListener('click', () => {
            this.showAddForm();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.formHandler.close();
                this.closeConfirmDialog();
            });
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.formHandler.close();
        });

        // Confirm dialog buttons
        document.getElementById('confirmNo').addEventListener('click', () => {
            this.closeConfirmDialog();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.formHandler.close();
                this.closeConfirmDialog();
            }
        });
    }

    /**
     * Save current application state to LocalStorage
     */
    saveState() {
        const state = {
            entity: this.currentEntity,
            page: this.paginationController.getCurrentPage(),
            limit: this.paginationController.getPageSize(),
            sort: this.currentSort,
            search: this.currentSearch
        };
        localStorage.setItem(this.stateKey, JSON.stringify(state));
    }

    /**
     * Restore application state from LocalStorage
     */
    restoreState() {
        const saved = localStorage.getItem(this.stateKey);
        if (!saved) return;

        try {
            const state = JSON.parse(saved);

            // Restore Entity
            if (state.entity) this.currentEntity = state.entity;

            // Restore Search
            if (state.search) {
                this.currentSearch = state.search;
                if (this.searchController && this.searchController.searchInput) {
                    this.searchController.searchInput.value = state.search;
                }
            }

            // Restore Sort
            if (state.sort) this.currentSort = state.sort;

            // Restore Pagination settings
            if (state.limit) {
                this.paginationController.pageSize = state.limit;
                // Update the dropdown UI to match
                const entriesSelect = document.getElementById('entriesPerPage');
                if (entriesSelect) entriesSelect.value = state.limit;
            }
            if (state.page) {
                this.paginationController.currentPage = state.page;
            }

        } catch (error) {
            console.error('Error restoring state:', error);
            // Fallback to defaults if error
        }
    }

    /**
     * Switch to different entity
     * @param {string} entity - Entity name
     */
    switchEntity(entity) {
        this.currentEntity = entity;
        this.currentSort = { field: null, order: 'asc' };
        this.currentSearch = '';
        this.searchController.clear();
        this.paginationController.currentPage = 1;
        this.loadData();
    }

    /**
     * Load data from API
     */
    async loadData() {
        try {
            // console.log('Loading data for entity:', this.currentEntity);
            this.tableRenderer.showLoading();

            // Build query parameters
            const params = {
                _page: this.paginationController.getCurrentPage(),
                _limit: this.paginationController.getPageSize()
            };

            // Add search query if exists
            if (this.currentSearch) {
                params.q = this.currentSearch;
            }

            // Add sort parameters if exists
            if (this.currentSort.field) {
                params._sort = this.currentSort.field;
                params._order = this.currentSort.order;
            }

            // Fetch data
            const result = await this.apiService.getAll(this.currentEntity, params);

            // Render table
            this.tableRenderer.renderHeaders(this.currentEntity, (field, order) => {
                this.handleSort(field, order);
            });

            this.tableRenderer.renderRows(
                result.data,
                this.currentEntity,
                (id) => this.handleEdit(id),
                (id) => this.handleDelete(id)
            );

            // Update pagination
            this.paginationController.update(
                result.total,
                this.paginationController.getCurrentPage(),
                this.paginationController.getPageSize()
            );

            // Ensure active tab is visually correct
            this.syncActiveTab();

            // SAVE STATE: Whenever data loads successfully, save the state
            this.saveState();

        } catch (error) {
            console.error('Error loading data:', error);
            this.tableRenderer.showError(error.message);
        }
    }

    /**
     * Handle sort
     * @param {string} field - Field to sort by
     * @param {string} order - Sort order (asc/desc)
     */
    handleSort(field, order) {
        this.currentSort = { field, order };
        this.paginationController.currentPage = 1; // Reset to first page
        this.loadData();
    }

    /**
     * Show add form
     */
    showAddForm() {
        this.formHandler.showAddForm(this.currentEntity, (formData) => {
            this.handleAdd(formData);
        });
    }

    /**
     * Handle edit
     * @param {number} id - Record ID
     */
    async handleEdit(id) {
        try {
            const record = await this.apiService.getById(this.currentEntity, id);
            this.formHandler.showEditForm(this.currentEntity, record, (formData) => {
                this.handleUpdate(formData);
            });
        } catch (error) {
            console.error('Error fetching record:', error);
            alert('Error loading record: ' + error.message);
        }
    }

    /**
     * Handle delete
     * @param {number} id - Record ID
     */
    handleDelete(id) {
        this.showConfirmDialog(
            'Are you sure you want to delete this record?',
            async () => {
                try {
                    console.log('Deleting record from entity:', this.currentEntity);
                    // Store current state
                    const currentPage = this.paginationController.getCurrentPage();
                    const pageSize = this.paginationController.getPageSize();

                    await this.apiService.delete(this.currentEntity, id);

                    // Check if we need to adjust the page after deletion
                    // If we deleted the last item on a page, go to previous page
                    const params = { _page: currentPage, _limit: pageSize };
                    if (this.currentSearch) params.q = this.currentSearch;

                    // Fetch current page data to check if it's empty
                    const result = await this.apiService.getAll(this.currentEntity, params);

                    // If current page is empty and we're not on page 1, go to previous page
                    if (result.data.length === 0 && currentPage > 1) {
                        this.paginationController.currentPage = currentPage - 1;
                    }

                    console.log('Reloading data for entity:', this.currentEntity);
                    await this.loadData();
                } catch (error) {
                    console.error('Error deleting record:', error);
                    alert('Error deleting record: ' + error.message);
                }
            }
        );
    }

    /**
     * Handle add new record
     * @param {object} formData - Form data
     */
    async handleAdd(formData) {
        try {
            await this.apiService.create(this.currentEntity, formData);
            // Stay on current entity, but reset to first page to see the new record
            this.paginationController.currentPage = 1;
            await this.loadData();
        } catch (error) {
            console.error('Error creating record:', error);
            alert('Error creating record: ' + error.message);
        }
    }

    /**
     * Handle update record
     * @param {object} formData - Form data
     */
    async handleUpdate(formData) {
        try {
            console.log('Updating record in entity:', this.currentEntity);
            await this.apiService.update(this.currentEntity, formData.id, formData);
            // Reload data on the same entity and same page
            // The state (currentPage, currentEntity) is preserved in the class instance
            console.log('Reloading data for entity:', this.currentEntity);
            await this.loadData();
        } catch (error) {
            console.error('Error updating record:', error);
            alert('Error updating record: ' + error.message);
        }
    }

    /**
     * Show confirmation dialog
     * @param {string} message - Confirmation message
     * @param {Function} onConfirm - Callback for confirmation
     */
    showConfirmDialog(message, onConfirm) {
        const dialog = document.getElementById('confirmDialog');
        const messageElement = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');

        messageElement.textContent = message;
        dialog.style.display = 'block';

        // Remove old listeners and add new one
        const newYesBtn = yesBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

        newYesBtn.addEventListener('click', () => {
            onConfirm();
            this.closeConfirmDialog();
        });
    }

    /**
     * Close confirmation dialog
     */
    closeConfirmDialog() {
        document.getElementById('confirmDialog').style.display = 'none';
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();

        // Restore state from LocalStorage before first load
        this.restoreState();

        this.syncActiveTab(); // Ensure active tab matches currentEntity
        this.loadData();
    }

    /**
     * Sync the active tab visual state with currentEntity
     */
    syncActiveTab() {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to current entity tab
        const activeTab = document.querySelector(`.tab-btn[data-entity="${this.currentEntity}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
}