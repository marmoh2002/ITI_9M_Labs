// 2- using Queue methods , write 2 functions : function i.e. " insert " into queue integers , such that 5 numbers at most , prints "queue is full " while try to insert the 6 number function i.e. "delete" deletes number
// from the queue such that u can insert another number after deleting one.

#include <iostream>
using namespace std;
#define MAX 5

class Queue
{
    int arr[MAX];
    int front, rear;
    int size_queue;

public:
    Queue()
    {
        front = -1;
        rear = -1;
        size_queue = 0;
    }
    int enqueue(int data)
    {
        if (size_queue < MAX)
        {
            if (front == -1) // Queue is empty
            {
                front = 0;
                rear = 0;
            }
            else
            {
                rear++;
            }

            arr[rear] = data;
            size_queue++;
            return 1; // Successfully enqueued
        }
        else
        {
            cout << "Queue is full" << endl;
            return 0; // Failed to enqueue
        }
    }

    int dequeue()
    {
        int retval = -1;

        if (size_queue > 0)
        {
            retval = arr[front];

            // Shift elements to the left
            for (int i = front; i < rear; i++)
            {
                arr[i] = arr[i + 1];
            }

            rear--;
            size_queue--;

            if (size_queue == 0) // Reset queue if it becomes empty
            {
                front = -1;
                rear = -1;
            }
        }
        else
        {
            cout << "Queue is empty" << endl;
        }

        return retval;
    }
};

int main()
{
    Queue queue;
    // Insert 6 numbers into the queue
    for (int i = 1; i <= 6; i++)
    {
        if (queue.enqueue(i))
        {
            cout << "Inserted " << i << " into the queue." << endl;
        }
        else
        {
            cout << "Queue is full while trying to insert " << i << "." << endl;
        }
    }

    // Delete 2 numbers from the queue
    for (int i = 1; i <= 2; i++)
    {
        int data = queue.dequeue();
        if (data != -1)
        {
            cout << "Deleted " << data << " from the queue." << endl;
        }
        else
        {
            cout << "Queue is empty while trying to delete." << endl;
        }
    }

    // Insert another number after deleting
    int newNumber = 10;
    if (queue.enqueue(newNumber))
    {
        cout << "Inserted " << newNumber << " into the queue after deletion." << endl;
    }
    else
    {
        cout << "Queue is full while trying to insert " << newNumber << "." << endl;
    }

    return 0;
}