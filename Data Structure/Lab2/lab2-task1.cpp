// using stack methods implemented on top of linked list top of empty array is 0, write 2 functions :
//- Push_data : a function that push integers into a stack
//- Pop_data : a function that retrieve data (pop) from the stack and prints "stack is empty" when there r no data in the stack
#include <iostream>
using namespace std;
#define MAX 100
struct Node
{
    int data;
    Node *pnext;
};
class Stack
{
    Node *pTop;
    int count()
    {
        int cnt = 0;
        Node *current = pTop;
        while (current)
        {
            cnt++;
            current = current->pnext;
        }
        return cnt;
    }

public:
    Stack()
    {
        pTop = nullptr;
    }
    int Push_data(int data)
    {
        int retval = 0;
        if (count() < MAX)
        {
            Node *newNode = new Node();
            newNode->data = data;
            newNode->pnext = pTop;
            pTop = newNode;
            retval = 1;
        }
        return retval;
    }
    int Pop_data(void)
    {
        int retval = -1;
        if (pTop)
        {
            Node *temp = pTop;
            retval = pTop->data;
            pTop = pTop->pnext;
            delete temp;
        }
        return retval;
    }
};
int main()
{
    Stack stack;
    // Push some data onto the stack
    for (int i = 1; i <= 5; i++)
    {
        if (stack.Push_data(i))
        {
            cout << "Pushed " << i << " onto the stack." << endl;
        }
        else
        {
            cout << "Stack is full. Cannot push " << i << "." << endl;
        }
    }
    // Pop some data from the stack
    for (int i = 1; i <= 6; i++)
    {
        int data = stack.Pop_data();
        if (data != -1)
        {
            cout << "Popped " << data << " from the stack." << endl;
        }
        else
        {
            cout << "Stack is empty. Cannot pop." << endl;
        }
    }
    return 0;
}
