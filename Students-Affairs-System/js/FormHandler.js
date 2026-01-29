// FormHandler.js - Handles form operations
import { EntityConfig } from './EntityConfig.js';

export class FormHandler {
    constructor(modalElement, formElement, formFieldsElement, modalTitleElement) {
        this.modal = modalElement;
        this.form = formElement;
        this.formFields = formFieldsElement;
        this.modalTitle = modalTitleElement;
        this.currentRecord = null;
        this.entityType = null;
        this.onSubmit = null;
    }

    /**
     * Show modal for adding new record
     * @param {string} entityType - The entity type
     * @param {Function} onSubmit - Callback function for form submission
     */
    showAddForm(entityType, onSubmit) {
        this.entityType = entityType;
        this.currentRecord = null;
        this.onSubmit = onSubmit;

        const entityTitle = EntityConfig.getTitle(entityType);
        this.modalTitle.textContent = `Add New ${entityTitle.slice(0, -1)}`; // Remove 's' from end

        this.renderForm();
        this.modal.style.display = 'block';
    }

    /**
     * Show modal for editing existing record
     * @param {string} entityType - The entity type
     * @param {object} record - The record to edit
     * @param {Function} onSubmit - Callback function for form submission
     */
    showEditForm(entityType, record, onSubmit) {
        this.entityType = entityType;
        this.currentRecord = record;
        this.onSubmit = onSubmit;

        const entityTitle = EntityConfig.getTitle(entityType);
        this.modalTitle.textContent = `Edit ${entityTitle.slice(0, -1)}`; // Remove 's' from end

        this.renderForm();
        this.populateForm(record);
        this.modal.style.display = 'block';
    }

    /**
     * Render form fields based on entity configuration
     */
    renderForm() {
        const fields = EntityConfig.getFormFields(this.entityType);

        let formHTML = '';

        fields.forEach(field => {
            formHTML += this.createFormField(field);
        });

        this.formFields.innerHTML = formHTML;
    }

    /**
     * Create HTML for a form field
     * @param {object} field - Field configuration
     * @returns {string} - HTML string
     */
    createFormField(field) {
        const requiredClass = field.required ? 'required' : '';
        const requiredAttr = field.required ? 'required' : '';
        const readonlyAttr = field.readonly ? 'readonly' : '';

        let inputHTML = '';

        if (field.type === 'textarea') {
            inputHTML = `<textarea 
                id="${field.name}" 
                name="${field.name}" 
                ${requiredAttr}
                ${readonlyAttr}
            ></textarea>`;
        } else if (field.type === 'select') {
            inputHTML = `
                <select 
                    id="${field.name}" 
                    name="${field.name}" 
                    ${requiredAttr}
                    ${readonlyAttr}
                >
                    <option value="">Select ${field.label}</option>
                    ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
            `;
        } else {
            const stepAttr = field.step ? `step="${field.step}"` : '';
            inputHTML = `<input 
                type="${field.type}" 
                id="${field.name}" 
                name="${field.name}" 
                ${requiredAttr}
                ${readonlyAttr}
                ${stepAttr}
            />`;
        }

        return `
            <div class="form-group">
                <label for="${field.name}" class="${requiredClass}">${field.label}</label>
                ${inputHTML}
            </div>
        `;
    }

    /**
     * Populate form with record data
     * @param {object} record - Record data
     */
    populateForm(record) {
        Object.keys(record).forEach(key => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'date' && record[key]) {
                    // Format date for input field
                    input.value = new Date(record[key]).toISOString().split('T')[0];
                } else {
                    input.value = record[key];
                }
            }
        });
    }

    /**
     * Get form data as object
     * @returns {object} - Form data
     */
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};

        const fields = EntityConfig.getAllFields(this.entityType);

        for (let [key, value] of formData.entries()) {
            // Find field configuration
            const field = fields.find(f => f.name === key);

            if (field) {
                // Convert to appropriate type
                if (field.type === 'number') {
                    data[key] = value ? parseFloat(value) : 0;
                } else {
                    data[key] = value;
                }
            }
        }

        // If editing, include the ID
        if (this.currentRecord && this.currentRecord.id) {
            data.id = this.currentRecord.id;
        }

        return data;
    }

    /**
     * Validate form
     * @returns {boolean} - True if valid
     */
    validateForm() {
        return this.form.checkValidity();
    }

    /**
     * Setup form submission handler
     */
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.validateForm()) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            const formData = this.getFormData();

            if (this.onSubmit) {
                this.onSubmit(formData, this.currentRecord);
            }

            this.close();
        });
    }

    /**
     * Close modal
     */
    close() {
        this.modal.style.display = 'none';
        this.form.reset();
        this.currentRecord = null;
    }

    /**
     * Initialize form handler
     */
    init() {
        this.setupFormSubmission();
    }
}