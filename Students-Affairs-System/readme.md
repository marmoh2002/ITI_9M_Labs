# Students Affairs System
A learning project demonstrating:
- ES6 modules
- OOP principles
- CRUD operations
- REST API interaction
- Modern JavaScript practices

A comprehensive web application for managing student affairs data including students, courses, instructors, and employees. Built with vanilla JavaScript ES6 modules and json-server as a mock backend.

## Preview
![Students Affairs System Preview](preview.gif)

## Features

- **CRUD Operations** - Create, Read, Update, Delete records for all entities
- **Search Functionality** - Real-time search across all data
- **Sorting** - Click column headers to sort data (ascending/descending)
- **State Persistence** - Automatically saves the user's current context (active tab, page number, search query, and sort order) to localStorage. If the page is refreshed or reopened, the application restores the exact state where the user left off.
- **Pagination** - Navigate through data with customizable page sizes
- **Responsive Design** - Modern, clean UI that works on all devices
- **Modular Architecture** - ES6 modules for maintainable code
- **OOP Design** - Class-based object-oriented programming

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript ES6** - Logic with modules (import/export)
- **Fetch API** - HTTP requests
- **json-server** - Fake server. Mocks REST API backend

## Project Structure

```
students-affairs-system/
│
├── index.html              # Main HTML file
├── styles.css              # All styling
├── db.json                 # JSON database file
├── package.json            # NPM config
│
└── js/                     # JavaScript modules
    ├── app.js              # Application entry point
    ├── DataManager.js      # Main controller/coordinator
    ├── ApiService.js       # API request handler
    ├── EntityConfig.js     # Entity schemas config
    ├── TableRenderer.js    # Table rendering logic
    ├── PaginationController.js  # Pagination logic
    ├── FormHandler.js      # Form operations
    └── SearchController.js # Search functionality
```

## Installation & Setup

### Prerequisites

- Node.js 
- npm 

### Step 1: Install Dependencies

```bash
npm install
```

This will install `json-server` which provides the mock REST API.

### Step 2: Start the JSON Server

```bash
npm start
```

This will start json-server on `http://localhost:3000`


### Step 3: Open the Application

Open `index.html` in your web browser. 


## Usage Guide

### Managing Data

#### View Records (UC-01)
1. Click on any tab (Students, Courses, Instructors, Employees)
2. Data will be displayed in a table format

#### Add New Record (UC-02)
1. Click the "Add New" button
2. Fill in the form fields
3. Click "Save"
4. New record appears in the table

#### Edit Record (UC-03)
1. Click the "Edit" button on any row
2. Modify the form fields
3. Click "Save"
4. Record is updated in the table

#### Delete Record (UC-04)
1. Click the "Delete" button on any row
2. Confirm the deletion in the dialog
3. Record is removed from the table

#### Search Records (UC-06)
1. Type keywords in the search box
2. Results are filtered automatically (500ms debounce)
3. Search works across all fields

#### Sort Records (UC-07)
1. Click on any column header
2. Click again to toggle between ascending/descending
3. Sort indicator (▲/▼) shows current sort direction

#### Paginate Records (UC-05)
1. Select entries per page (10, 25, 50, 100)
2. Use pagination controls:
   - First/Last: Jump to first/last page
   - Previous/Next: Navigate one page at a time
   - Page numbers: Click to jump to specific page

## Data Entities

### Students
- ID, Name, Email, Age, Major, GPA, Enrollment Date

### Courses
- ID, Code, Name, Credits, Department, Description, Semester

### Instructors
- ID, Name, Email, Phone, Department, Office, Hire Date

### Employees
- ID, Name, Position, Office, Age, Start Date, Salary

## API Endpoints

json-server provides these REST endpoints:

```
GET    /students          - Get all students
GET    /students/:id      - Get student by ID
POST   /students          - Create new student
PUT    /students/:id      - Update student
DELETE /students/:id      - Delete student
```

Same pattern for `/courses`, `/instructors`, and `/employees`

### Query Parameters

- `_page` - Page number (for pagination)
- `_limit` - Items per page
- `_sort` - Sort by field
- `_order` - Sort order (asc/desc)
- `q` - Full-text search

Example: `http://localhost:3000/students?_page=1&_limit=10&_sort=name&_order=asc`

## Architecture & Design

### Class-Based OOP Structure

**ApiService**: Handles all HTTP requests (GET, POST, PUT, DELETE)
- Uses Fetch API
- Error handling
- Returns promises

**EntityConfig**: Defines schemas for each entity type
- Field configurations
- Validation rules
- Display settings

**TableRenderer**: Manages table display
- Dynamic header generation
- Row rendering with formatting
- Sort indicators

**PaginationController**: Handles pagination logic
- Page calculations
- Control button states
- Page number display

**FormHandler**: Manages add/edit forms
- Dynamic form generation
- Data validation
- Form submission

**SearchController**: Implements search functionality
- Debounced input
- Query management

**DataManager**: Main coordinator class
- Orchestrates all components
- Event handling
- Data flow management
- State management

## Error Handling

The application includes comprehensive error handling:

- Network errors (json-server not running)
- Invalid data
- Failed CRUD operations
- User-friendly error messages

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires ES6 module support (all modern browsers).

## Customization

### Adding New Entities

1. Add entity configuration in `EntityConfig.js`
2. Add tab button in `index.html`
3. Add data to `db.json`

### Modifying Field Configurations

Edit the `EntityConfig.js` file to:
- Add/remove fields
- Change field types
- Modify validation rules
- Update display settings


# Implementation Details:
## Architecture Overview:
```
User Interface (HTML)
        ↓
    DataManager (Coordinator)
        ↓
    ┌───┴───┬────────┬──────────┬─────────┐
    ↓       ↓        ↓          ↓         ↓
ApiService  Table    Pagination Form     Search
            Renderer Controller Handler Controller
```
The project uses Class-Based OOP with ES6 Modules. Each class follows the Single Responsibility Principle - one class, one job.


##  Complete Data Flow Examples

### Example 1: User Searches for "John"
```
1. User types "john"
   ↓
2. SearchController (debounce 500ms)
   ↓
3. SearchController calls callback: dataManager.currentSearch = "john"
   ↓
4. DataManager.loadData()
   ↓
5. Build params: { _page: 1, _limit: 25, q: "john" }
   ↓
6. ApiService.getAll('students', params)
   ↓
7. Fetch: GET http://localhost:3000/students?_page=1&_limit=25&q=john
   ↓
8. json-server returns filtered data
   ↓
9. TableRenderer.renderRows(filteredData)
   ↓
10. PaginationController.update(filteredTotal)
   ↓
11. UI updates with search results
```

### Example 2: User Edits a Student
```
1. User clicks Edit button (data-id="5")
   ↓
2. TableRenderer triggers callback: onEdit(5)
   ↓
3. DataManager.handleEdit(5)
   ↓
4. ApiService.getById('students', 5)
   ↓
5. Fetch: GET http://localhost:3000/students/5
   ↓
6. Returns student data: { id: 5, name: "David Wilson", ... }
   ↓
7. FormHandler.showEditForm('students', record, callback)
   ↓
8. FormHandler.renderForm() - generates form fields
   ↓
9. FormHandler.populateForm(record) - fills with data
   ↓
10. Modal displayed with pre-filled form
   ↓
11. User modifies name to "David Wilson Jr."
   ↓
12. User clicks Save
   ↓
13. FormHandler.getFormData() - extracts form data
   ↓
14. FormHandler triggers callback: onSubmit(formData)
   ↓
15. DataManager.handleUpdate(formData)
   ↓
16. ApiService.update('students', 5, formData)
   ↓
17. Fetch: PUT http://localhost:3000/students/5
        Body: { id: 5, name: "David Wilson Jr.", ... }
   ↓
18. json-server updates record
   ↓
19. DataManager.loadData() - refresh table
   ↓
20. Updated data displayed in table
```

### Example 3: User Sorts by Name
```
1. User clicks "Name" column header
   ↓
2. TableRenderer.updateSortIndicators()
   ↓
3. Sets currentSort: { field: "name", order: "asc" }
   ↓
4. TableRenderer triggers callback: onSort("name", "asc")
   ↓
5. DataManager.handleSort("name", "asc")
   ↓
6. Sets currentSort state
   ↓
7. Resets to page 1
   ↓
8. DataManager.loadData()
   ↓
9. Build params: { _page: 1, _limit: 25, _sort: "name", _order: "asc" }
   ↓
10. ApiService.getAll('students', params)
   ↓
11. Fetch: GET http://localhost:3000/students?_page=1&_limit=25&_sort=name&_order=asc
   ↓
12. json-server returns sorted data
   ↓
13. TableRenderer.renderRows(sortedData)
   ↓
14. Table displays with ▲ indicator on Name column