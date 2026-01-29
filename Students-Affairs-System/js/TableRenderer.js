// TableRenderer.js - Handles table rendering
import { EntityConfig } from './EntityConfig.js';

export class TableRenderer {
    constructor(tableHeadElement, tableBodyElement) {
        this.tableHead = tableHeadElement;
        this.tableBody = tableBodyElement;
        this.currentSort = { field: null, order: 'asc' };
    }

    /**
     * Render table headers
     * @param {string} entityType - The entity type
     * @param {Function} onSort - Sort callback function
     */
    renderHeaders(entityType, onSort) {
        const fields = EntityConfig.getTableFields(entityType);

        let headerHTML = '<tr>';

        fields.forEach(field => {
            headerHTML += `
                <th class="sortable" data-field="${field.name}">
                    ${field.label}
                </th>
            `;
        });

        // Add actions column
        headerHTML += '<th>Edit</th><th>Delete</th>';
        headerHTML += '</tr>';

        this.tableHead.innerHTML = headerHTML;

        // Add sort event listeners
        this.tableHead.querySelectorAll('th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const field = th.dataset.field;
                this.updateSortIndicators(th, field);
                onSort(field, this.currentSort.order);
            });
        });
    }

    /**
     * Update sort indicators on table headers
     * @param {HTMLElement} clickedHeader - The clicked header element
     * @param {string} field - Field name
     */
    updateSortIndicators(clickedHeader, field) {
        // Remove all sort classes
        this.tableHead.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });

        // Toggle sort order
        if (this.currentSort.field === field) {
            this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.order = 'asc';
        }

        // Add sort class to clicked header
        clickedHeader.classList.add(
            this.currentSort.order === 'asc' ? 'sort-asc' : 'sort-desc'
        );
    }

    /**
     * Render table rows
     * @param {Array} data - Array of data records
     * @param {string} entityType - The entity type
     * @param {Function} onEdit - Edit callback function
     * @param {Function} onDelete - Delete callback function
     */
    renderRows(data, entityType, onEdit, onDelete) {
        if (!data || data.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="100" style="text-align: center; padding: 40px;">
                        No records found
                    </td>
                </tr>
            `;
            return;
        }

        const fields = EntityConfig.getTableFields(entityType);

        let rowsHTML = '';

        data.forEach(record => {
            rowsHTML += '<tr>';

            fields.forEach(field => {
                let value = record[field.name];

                // Format value based on type
                if (field.type === 'date' && value) {
                    value = new Date(value).toISOString().split('T')[0];
                } else if (field.type === 'number' && field.name === 'salary') {
                    value = '$' + value.toLocaleString();
                } else if (field.type === 'number' && field.step === '0.01') {
                    value = parseFloat(value).toFixed(2);
                }

                rowsHTML += `<td>${value !== null && value !== undefined ? value : ''}</td>`;
            });

            // Add action buttons
            rowsHTML += `
                <td>
                    <button class="action-btn edit-btn" data-id="${record.id}">Edit</button>
                </td>
                <td>
                    <button class="action-btn delete-btn" data-id="${record.id}">Delete</button>
                </td>
            `;
            rowsHTML += '</tr>';
        });

        this.tableBody.innerHTML = rowsHTML;

        // Add event listeners for action buttons
        this.tableBody.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                onEdit(id);
            });
        });

        this.tableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                onDelete(id);
            });
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="100" class="loading">
                    Loading data...
                </td>
            </tr>
        `;
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="100" style="text-align: center; padding: 40px; color: #e74c3c;">
                    <strong>Error:</strong> ${message}
                </td>
            </tr>
        `;
    }
}