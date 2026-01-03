// using stack methods implemented on top of array top of empty array is 0, write 2 functions :
//- Push_data : a function that push integers into a stack
//- Pop_data : a function that retrieve data (pop) from the stack and prints "stack is empty" when there r no data in the stack
#include <iostream>
using namespace std;
#define MAX 100
class Stack
{
    int ar[10]; //+ve value only
    int tos;

public:
    int Push_data(int data)
    {
        int retval = 0;
        if (tos < 10)
        {
            ar[tos] = data;
            tos++;
            retval = 1;
        }
        return retval;
    }
    int Pop_data(void)
    {
        int retval = -1;
        if (tos > 0)
        {
            tos--;
            retval = ar[tos];
        }
        return retval;
    }
    Stack()
    {
        tos = 0;
    }
};
int main()
{
    Stack s1;
    int data, ret;
    cout << "Enter data to push into stack (-1 to stop): ";
    while (true)
    {
        cin >> data;
        if (data == -1)
            break;
        if (s1.Push_data(data))
            cout << data << " pushed into stack." << endl;
        else
            cout << "Stack overflow. Cannot push " << data << "." << endl;
    }

    cout << "Popping data from stack:" << endl;
    while (true)
    {
        ret = s1.Pop_data();
        if (ret == -1)
        {
            cout << "Stack is empty." << endl;
            break;
        }
        else
        {
            cout << ret << " popped from stack." << endl;
        }
    }
    return 0;
}
