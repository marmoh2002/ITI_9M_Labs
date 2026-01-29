// ApiService.js - Handles all API requests to json-server
export class ApiService {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    /**
     * GET request - Fetch all records or search/filter
     * @param {string} entity - The entity name (students, courses, etc.)
     * @param {object} params - Query parameters
     * @returns {Promise} - Response data
     */
    async getAll(entity, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${this.baseUrl}/${entity}${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Get total count from headers (json-server provides this)
            const totalCount = response.headers.get('X-Total-Count');

            return {
                data: data,
                total: totalCount ? parseInt(totalCount) : data.length
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch data. Please ensure json-server is running.');
        }
    }

    /**
     * GET request - Fetch single record by ID
     * @param {string} entity - The entity name
     * @param {number} id - Record ID
     * @returns {Promise} - Response data
     */
    async getById(entity, id) {
        try {
            const response = await fetch(`${this.baseUrl}/${entity}/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching record:', error);
            throw new Error('Failed to fetch record.');
        }
    }

    /**
     * POST request - Create new record
     * @param {string} entity - The entity name
     * @param {object} data - Record data
     * @returns {Promise} - Response data
     */
    async create(entity, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${entity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating record:', error);
            throw new Error('Failed to create record.');
        }
    }

    /**
     * PUT request - Update existing record
     * @param {string} entity - The entity name
     * @param {number} id - Record ID
     * @param {object} data - Updated record data
     * @returns {Promise} - Response data
     */
    async update(entity, id, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${entity}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating record:', error);
            throw new Error('Failed to update record.');
        }
    }

    /**
     * DELETE request - Delete record
     * @param {string} entity - The entity name
     * @param {number} id - Record ID
     * @returns {Promise} - Response data
     */
    async delete(entity, id) {
        try {
            const response = await fetch(`${this.baseUrl}/${entity}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting record:', error);
            throw new Error('Failed to delete record.');
        }
    }
}