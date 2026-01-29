// app.js - Main application entry point
import { DataManager } from './DataManager.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dataManager = new DataManager();
    dataManager.init();

    // Expose to window for debugging (can be removed in production)
    window.dataManager = dataManager;
    console.log('DataManager initialized and exposed to window.dataManager for debugging');
});