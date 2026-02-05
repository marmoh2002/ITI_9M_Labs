# Student Affairs System - With Admin Login

## Overview

This is a complete Student Management System designed to demonstrate how to build a Single Page Application (SPA) using vanilla JavaScript. It features a full Create, Read, Update, and Delete (CRUD) workflow for managing students, courses, instructors, and employees.

The project is strictly educational. It avoids modern frameworks (like React or Vue) to focus on core web development concepts, including ES6 modules, RESTful API integration, state management, and frontend routing.

**Important:** This project includes a login system for demonstration purposes. It is **frontend-only** and is not secure for production use. Please read the Security Notes section for more details.


## DEMO


login:
---

website functionality:
---
![Demo GIF](./video/video_tut_gif.gif)
---

---

## Technology Stack

**Frontend**

* HTML5 & CSS3 (Responsive Design)
* JavaScript (ES6+ Standards)
* ES6 Modules (No build tools required)
* Local & Session Storage APIs

**Backend (Simulation)**

* **json-server:** Acts as a mock REST API.
* **Node.js:** Required to run the mock server.

**Architecture**

* Model-View-Controller (MVC) pattern.
* Component-based structure with clear separation of concerns.

---

## Features

* **Admin Dashboard:** A protected interface that requires a login session.
* **Complete Management:** dedicated sections for Students, Courses, Instructors, and Employees.
* **Search & Filtering:** Real-time search functionality across all data fields.
* **Data Organization:** Clickable column headers for sorting and pagination controls for handling large datasets.
* **State Persistence:** The application remembers your last view, search query, and page number even if you refresh the browser.
* **Mock Authentication:** Uses `sessionStorage` to simulate a login session.

---

## Setup Instructions

You will need **Node.js** installed on your computer to run the mock database. You will also need a basic web server to serve the HTML files (to support ES6 modules).

### Step 1: Install the Mock Backend

Open your terminal and install `json-server` globally. This tool allows us to use a simple JSON file as a database.

```bash
npm install -g json-server
```

### Step 2: Start the Backend API

Navigate to the project directory in your terminal and run the following command. This will watch the `db.json` file for changes.

```bash
json-server --watch db.json --port 3000
```

Keep this terminal window open. You can verify it is working by visiting `http://localhost:3000/students` in your browser.

### Step 3: Start the Web Server

Open a **new** terminal window (do not close the previous one) and navigate to the project directory. You need to serve the files using a local web server. You can use Python, Node, or PHP.

**Using Python (Recommended):**

```bash
python -m http.server 8000
# or for Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**

```bash
npx http-server -p 8000
```

**Using PHP:**

```bash
php -S localhost:8000
```

### Step 4: Login

Open your web browser and go to `http://localhost:8000/login.html`.

Use the following demo credentials:

* **Username:** admin
* **Password:** admin123

---

## Project Structure & Code Overview

Here is a brief explanation of how the files are organized and what they do.

**Root Files**

* `login.html` & `dashboard.html`: The entry points for the UI.
* `db.json`: The mock database file.
* `js/`: The folder containing all application logic.

**JavaScript Modules (in `js/`)**

* **AuthService.js:** Handles the login validation and manages the browser session.
* **DataManager.js:** The main controller. It connects the API to the UI components.
* **ApiService.js:** Handles all HTTP requests (GET, POST, PUT, DELETE) to the backend.
* **EntityConfig.js:** Defines the structure (schema) for students, courses, etc. If you want to add a new field, you do it here.
* **TableRenderer.js:** Dynamically builds the HTML tables and handles sorting logic.
* **FormHandler.js:** Manages the pop-up forms for adding and editing data.
* **PaginationController.js:** Calculates page numbers and renders the pagination bar.
* **SearchController.js:** Listens for user input and filters the data results.

---

## User Guide

**Navigation**

Once logged in, you can switch between Students, Courses, Instructors, and Employees using the tabs at the top of the dashboard.

**Managing Data**

* **Adding:** Click the "Add New" button in the top right. A form will appear based on the current section you are viewing.
* **Editing:** Click the "Edit" button on any data row to modify information.
* **Deleting:** Click the "Delete" button to remove a record.
* **Searching:** Type in the search box to filter results. The search applies to all visible columns.
* **Sorting:** Click any column header (e.g., "Name" or "ID") to sort the data ascending or descending.

**Session Behavior**

The application uses `sessionStorage`. If you close the browser tab, you will be logged out. However, if you simply refresh the page, your session is kept alive, and the app will remember exactly which page and tab you were looking at.

---

## Security and Architecture Notes

### How Authentication Works (Demo Only)

1. **Login:** When you enter credentials, `AuthService.js` compares them against hardcoded strings in the JavaScript file.
2. **Session:** If they match, a simple object is saved to the browser's `sessionStorage`.
3. **Protection:** When `dashboard.html` loads, it checks if this session object exists. If not, it redirects you back to the login page.

### Security Warning

**This system is not secure.**

Because this is a frontend-only educational project, it has significant security limitations:

* Credentials are stored in plain text within the JavaScript code.
* There is no backend validation. A user could technically bypass the login by manually editing their browser storage.
* Passwords are not encrypted.

**For a Production Environment:**

You must implement a real backend (using Node.js, Python, PHP, etc.) that validates credentials against a secure database, uses encrypted passwords (hashing), and issues secure session tokens (like JWTs) over HTTPS.

---

## Customization

To change the login credentials, edit `js/AuthService.js`:

```javascript
this.validCredentials = {
    username: 'new_username',
    password: 'new_password'
};
```

To add new fields to the tables (like a "Phone Number" for students), edit `js/EntityConfig.js` and ensure your `db.json` has the matching data.

