// AuthService.js - Handles authentication logic
export class AuthService {
    constructor() {
        this.storageKey = 'sas_auth_session';
        // Demo credentials - In production, this would be validated against a backend
        this.validCredentials = {
            username: 'admin',
            password: 'admin123'
        };
    }

    /**
     * Attempt to login with username and password
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} - True if login successful
     */
    login(username, password) {
        // Validate credentials
        if (username === this.validCredentials.username &&
            password === this.validCredentials.password) {

            // Create session data
            const session = {
                username: username,
                loginTime: new Date().toISOString(),
                isAuthenticated: true
            };

            // Store session in sessionStorage (clears when browser closes)
            sessionStorage.setItem(this.storageKey, JSON.stringify(session));

            return true;
        }

        return false;
    }

    /**
     * Logout and clear session
     */
    logout() {
        sessionStorage.removeItem(this.storageKey);
        // Also clear any app state
        localStorage.removeItem('sas_app_state');
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        const session = this.getSession();
        return session !== null && session.isAuthenticated === true;
    }

    /**
     * Get current session data
     * @returns {object|null}
     */
    getSession() {
        try {
            const sessionData = sessionStorage.getItem(this.storageKey);
            if (sessionData) {
                return JSON.parse(sessionData);
            }
        } catch (error) {
            console.error('Error reading session:', error);
        }
        return null;
    }

    /**
     * Get current username
     * @returns {string|null}
     */
    getCurrentUsername() {
        const session = this.getSession();
        return session ? session.username : null;
    }

    /**
     * Redirect to login page
     */
    redirectToLogin() {
        window.location.href = 'login.html';
    }

    /**
     * Redirect to dashboard
     */
    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }
}