// EntityConfig.js - Configuration for different entities
export class EntityConfig {
    static getConfig(entityType) {
        const configs = {
            students: {
                fields: [
                    { name: 'id', label: 'ID', type: 'number', readonly: true, showInTable: true },
                    { name: 'name', label: 'Name', type: 'text', required: true, showInTable: true },
                    { name: 'email', label: 'Email', type: 'email', required: true, showInTable: true },
                    { name: 'age', label: 'Age', type: 'number', required: true, showInTable: true },
                    { name: 'major', label: 'Major', type: 'text', required: true, showInTable: true },
                    { name: 'gpa', label: 'GPA', type: 'number', step: '0.01', required: true, showInTable: true },
                    { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date', required: true, showInTable: true }
                ],
                title: 'Students'
            },
            courses: {
                fields: [
                    { name: 'id', label: 'ID', type: 'number', readonly: true, showInTable: true },
                    { name: 'code', label: 'Course Code', type: 'text', required: true, showInTable: true },
                    { name: 'name', label: 'Course Name', type: 'text', required: true, showInTable: true },
                    { name: 'credits', label: 'Credits', type: 'number', required: true, showInTable: true },
                    { name: 'department', label: 'Department', type: 'text', required: true, showInTable: true },
                    { name: 'description', label: 'Description', type: 'textarea', required: false, showInTable: false },
                    {
                        name: 'semester', label: 'Semester', type: 'select',
                        options: ['Fall', 'Spring', 'Summer'], required: true, showInTable: true
                    }
                ],
                title: 'Courses'
            },
            instructors: {
                fields: [
                    { name: 'id', label: 'ID', type: 'number', readonly: true, showInTable: true },
                    { name: 'name', label: 'Name', type: 'text', required: true, showInTable: true },
                    { name: 'email', label: 'Email', type: 'email', required: true, showInTable: true },
                    { name: 'phone', label: 'Phone', type: 'tel', required: true, showInTable: true },
                    { name: 'department', label: 'Department', type: 'text', required: true, showInTable: true },
                    { name: 'office', label: 'Office', type: 'text', required: true, showInTable: true },
                    { name: 'hireDate', label: 'Hire Date', type: 'date', required: true, showInTable: true }
                ],
                title: 'Instructors'
            },
            employees: {
                fields: [
                    { name: 'id', label: 'ID', type: 'number', readonly: true, showInTable: true },
                    { name: 'name', label: 'Name', type: 'text', required: true, showInTable: true },
                    { name: 'position', label: 'Position', type: 'text', required: true, showInTable: true },
                    { name: 'office', label: 'Office', type: 'text', required: true, showInTable: true },
                    { name: 'age', label: 'Age', type: 'number', required: true, showInTable: true },
                    { name: 'startDate', label: 'Start Date', type: 'date', required: true, showInTable: true },
                    { name: 'salary', label: 'Salary', type: 'number', required: true, showInTable: true }
                ],
                title: 'Employees'
            }
        };

        return configs[entityType] || configs.students;
    }

    static getTableFields(entityType) {
        const config = this.getConfig(entityType);
        return config.fields.filter(field => field.showInTable);
    }

    static getFormFields(entityType) {
        const config = this.getConfig(entityType);
        return config.fields.filter(field => field.name !== 'id');
    }

    static getAllFields(entityType) {
        const config = this.getConfig(entityType);
        return config.fields;
    }

    static getTitle(entityType) {
        const config = this.getConfig(entityType);
        return config.title;
    }
}