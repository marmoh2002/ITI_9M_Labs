// Implement linked list for structure student data (name `id )
// 1- User can add new student
// 2- insert in location
// 3-search by id
#include <iostream>
#include <string>
using namespace std;

struct Student
{
    string name;
    int id;
    Student *next;
};
class StudentList
{
private:
    Student *head;
    Student *tail;
    Student *createStudent(const string &name, int id)
    {
        Student *newStudent = new Student;
        newStudent->name = name;
        newStudent->id = id;
        newStudent->next = nullptr;
        return newStudent;
    }

public:
    StudentList()
    {
        head = nullptr;
        tail = nullptr;
    }
    int addStudent(const string &name, int id)
    {
        int added = 0;
        Student *newStudent = createStudent(name, id);
        if (newStudent != nullptr)
        {
            added = 1;
            if (head == nullptr)
            {
                head = newStudent;
            }
            else
            {
                tail->next = newStudent;
            }
            tail = newStudent;
        }
        return added;
    }
    int insertStudentAt(const string &name, int id, int position)
    {
        int inserted = 0;
        int i;
        Student *newStudent = createStudent(name, id);
        Student *temp = nullptr;
        if (newStudent != nullptr)
        {
            inserted = 1;
            if (head == nullptr && position > 0)
            {
                head = tail = newStudent;
            }
            else
            {
                if (position == 0)
                {
                    newStudent->next = head;
                    head = newStudent;
                }
                else
                {
                    temp = head;
                    for (i = 0; i < position - 1 && temp != nullptr; i++)
                    {
                        temp = temp->next;
                    }
                    if (temp == nullptr || temp == tail)
                    {
                        tail->next = newStudent;
                        tail = newStudent;
                    }
                    else
                    {
                        newStudent->next = temp->next;
                        temp->next = newStudent;
                    }
                }
            }
        }
        return inserted;
    }
    Student *searchById(int id)
    {
        Student *current = head;
        while (current != nullptr)
        {
            if (current->id == id)
            {
                return current;
            }
            current = current->next;
        }
        return nullptr;
    }
    void displayAllStudents()
    {
        Student *current = head;
        if (current == nullptr)
        {
            cout << "No students in the list." << endl;
            return;
        }
        while (current != nullptr)
        {
            cout << "Name: " << current->name << ", ID: " << current->id << endl;
            current = current->next;
        }
    }
    ~StudentList()
    {
        Student *current = head;
        while (current != nullptr)
        {
            Student *toDelete = current;
            current = current->next;
            delete toDelete;
        }
    }
};

int main()
{
    // Example usage with user input
    StudentList list;
    int choice, id, position;
    string name;
    do
    {
        cout << "1. Add Student\n2. Insert Student at Position\n3. Search by ID\n4. Display Students\n5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;
        switch (choice)
        {
        case 1:
            cout << "Enter name: ";
            cin >> name;
            cout << "Enter ID: ";
            cin >> id;
            list.addStudent(name, id);
            break;
        case 2:
            cout << "Enter name: ";
            cin >> name;
            cout << "Enter ID: ";
            cin >> id;
            cout << "Enter position: ";
            cin >> position;
            list.insertStudentAt(name, id, position);
            break;
        case 3:
            cout << "Enter ID to search: ";
            cin >> id;
            {
                Student *student = list.searchById(id);
                if (student != nullptr)
                {
                    cout << "Found Student - Name: " << student->name << ", ID: " << student->id << endl;
                }
                else
                {
                    cout << "Student with ID " << id << " not found." << endl;
                }
            }
            break;
        case 4:
            list.displayAllStudents();
            break;
        case 5:
            cout << "Exiting..." << endl;
            break;
        default:
            cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 5);

    return 0;
}