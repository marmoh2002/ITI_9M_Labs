// app.js - Main application entry point
import { DataManager } from './DataManager.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dataManager = new DataManager();
    dataManager.init();
});