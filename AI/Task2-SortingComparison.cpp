#include <iostream>
#include <vector>
#include <chrono>
#include <algorithm>
#include <random>
#include <cstring>

using namespace std;
using namespace chrono;

// ==================== SORTING ALGORITHMS ====================

// 1. QuickSort - O(n log n) average, O(n²) worst case
int partitionQuick(vector<int> &arr, int low, int high)
{
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int> &arr, int low, int high)
{
    if (low < high)
    {
        int pi = partitionQuick(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// 2. Merge Sort - O(n log n) guaranteed
void merge(vector<int> &arr, int left, int mid, int right)
{
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right)
    {
        if (arr[i] <= arr[j])
        {
            temp[k++] = arr[i++];
        }
        else
        {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid)
        temp[k++] = arr[i++];
    while (j <= right)
        temp[k++] = arr[j++];

    for (i = left, k = 0; i <= right; i++, k++)
    {
        arr[i] = temp[k];
    }
}

void mergeSort(vector<int> &arr, int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

// 3. Heap Sort - O(n log n) guaranteed
void heapify(vector<int> &arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i)
    {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int> &arr)
{
    int n = arr.size();

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--)
    {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

// 4. Insertion Sort - O(n²)
void insertionSort(vector<int> &arr)
{
    int n = arr.size();
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// 5. Bubble Sort - O(n²)
void bubbleSort(vector<int> &arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// 6. Selection Sort - O(n²)
void selectionSort(vector<int> &arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; i++)
    {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIdx])
            {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}

// ==================== HELPER FUNCTIONS ====================

vector<int> generateRandomArray(int size)
{
    vector<int> arr(size);
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 100000);

    for (int i = 0; i < size; i++)
    {
        arr[i] = dis(gen);
    }
    return arr;
}

vector<int> generateSortedArray(int size)
{
    vector<int> arr(size);
    for (int i = 0; i < size; i++)
    {
        arr[i] = i;
    }
    return arr;
}

vector<int> generateReverseSortedArray(int size)
{
    vector<int> arr(size);
    for (int i = 0; i < size; i++)
    {
        arr[i] = size - i;
    }
    return arr;
}

bool isSorted(const vector<int> &arr)
{
    for (int i = 0; i < arr.size() - 1; i++)
    {
        if (arr[i] > arr[i + 1])
            return false;
    }
    return true;
}

// ==================== TIMING AND COMPARISON ====================

int main()
{
    cout << "====================================================================\n";
    cout << "SORTING ALGORITHMS COMPARISON: TIME AND SPACE COMPLEXITY ANALYSIS\n";
    cout << "====================================================================\n\n";

    // Complexity Table
    cout << "COMPLEXITY TABLE:\n";
    cout << "====================================================================\n";
    cout << "Algorithm        | Best Case      | Average Case   | Worst Case\n";
    cout << "====================================================================\n";
    cout << "QuickSort        | O(n log n)     | O(n log n)     | O(n²)\n";
    cout << "MergeSort        | O(n log n)     | O(n log n)     | O(n log n)\n";
    cout << "HeapSort         | O(n log n)     | O(n log n)     | O(n log n)\n";
    cout << "InsertionSort    | O(n)           | O(n²)          | O(n²)\n";
    cout << "BubbleSort       | O(n)           | O(n²)          | O(n²)\n";
    cout << "SelectionSort    | O(n²)          | O(n²)          | O(n²)\n";
    cout << "====================================================================\n\n";

    cout << "SPACE COMPLEXITY TABLE:\n";
    cout << "====================================================================\n";
    cout << "Algorithm        | Space Complexity | Notes\n";
    cout << "====================================================================\n";
    cout << "QuickSort        | O(log n)         | In-place, recursive call stack\n";
    cout << "MergeSort        | O(n)             | Requires auxiliary array\n";
    cout << "HeapSort         | O(1)             | In-place, builds heap in array\n";
    cout << "InsertionSort    | O(1)             | In-place sorting\n";
    cout << "BubbleSort       | O(1)             | In-place sorting\n";
    cout << "SelectionSort    | O(1)             | In-place sorting\n";
    cout << "====================================================================\n\n";

    // Performance Testing
    vector<int> sizes = {1000, 5000, 10000};

    for (int size : sizes)
    {
        cout << "\n========== RANDOM ARRAY (Size: " << size << ") ==========\n";
        vector<int> original = generateRandomArray(size);

        // QuickSort
        vector<int> arr = original;
        auto start = high_resolution_clock::now();
        quickSort(arr, 0, arr.size() - 1);
        auto end = high_resolution_clock::now();
        auto qsDuration = duration_cast<microseconds>(end - start);
        cout << "QuickSort:     " << qsDuration.count() << " µs" << endl;

        // MergeSort
        arr = original;
        start = high_resolution_clock::now();
        mergeSort(arr, 0, arr.size() - 1);
        end = high_resolution_clock::now();
        auto msDuration = duration_cast<microseconds>(end - start);
        cout << "MergeSort:     " << msDuration.count() << " µs" << endl;

        // HeapSort
        arr = original;
        start = high_resolution_clock::now();
        heapSort(arr);
        end = high_resolution_clock::now();
        auto hsDuration = duration_cast<microseconds>(end - start);
        cout << "HeapSort:      " << hsDuration.count() << " µs" << endl;

        // InsertionSort (only for smaller sizes)
        if (size <= 5000)
        {
            arr = original;
            start = high_resolution_clock::now();
            insertionSort(arr);
            end = high_resolution_clock::now();
            auto isDuration = duration_cast<microseconds>(end - start);
            cout << "InsertionSort: " << isDuration.count() << " µs" << endl;
        }
    }

    // Worst Case Testing for QuickSort
    cout << "\n========== WORST CASE TESTING (Reverse Sorted Array) ==========\n";
    vector<int> testSize = {1000, 5000};

    for (int size : testSize)
    {
        vector<int> reversed = generateReverseSortedArray(size);

        vector<int> arr = reversed;
        auto start = high_resolution_clock::now();
        quickSort(arr, 0, arr.size() - 1);
        auto end = high_resolution_clock::now();
        auto duration = duration_cast<microseconds>(end - start);

        cout << "QuickSort (Reversed " << size << "): " << duration.count() << " µs" << endl;
    }

    cout << "\n====================================================================\n";
    cout << "KEY INSIGHTS:\n";
    cout << "====================================================================\n";
    cout << "1. QuickSort: Fast average case O(n log n), but vulnerable to\n";
    cout << "   worst-case O(n²) on sorted/reverse-sorted data\n";
    cout << "2. MergeSort: Consistent O(n log n) but requires O(n) extra space\n";
    cout << "3. HeapSort: O(n log n) guaranteed with O(1) space\n";
    cout << "4. O(n²) algorithms: Best for small datasets or nearly-sorted data\n";
    cout << "5. In practice: QuickSort preferred due to cache locality\n";
    cout << "====================================================================\n";

    return 0;
}
