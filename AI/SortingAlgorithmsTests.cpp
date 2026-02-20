#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>
#include <chrono>
#include <cassert>

using namespace std;

// ============================================================================
// SORTING ALGORITHMS
// ============================================================================

// QuickSort Implementation
int partition(vector<int> &arr, int low, int high)
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
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// MergeSort Implementation
void merge(vector<int> &arr, int left, int mid, int right)
{
    vector<int> temp;
    int i = left, j = mid + 1;

    while (i <= mid && j <= right)
    {
        if (arr[i] <= arr[j])
        {
            temp.push_back(arr[i++]);
        }
        else
        {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid)
    {
        temp.push_back(arr[i++]);
    }

    while (j <= right)
    {
        temp.push_back(arr[j++]);
    }

    for (int i = 0; i < temp.size(); i++)
    {
        arr[left + i] = temp[i];
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

// HeapSort Implementation
void heapify(vector<int> &arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
    {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest])
    {
        largest = right;
    }

    if (largest != i)
    {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int> &arr)
{
    int n = arr.size();

    for (int i = n / 2 - 1; i >= 0; i--)
    {
        heapify(arr, n, i);
    }

    for (int i = n - 1; i > 0; i--)
    {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

// ============================================================================
// TEST FRAMEWORK
// ============================================================================

class TestResult
{
public:
    int totalTests = 0;
    int passedTests = 0;
    int failedTests = 0;

    void printSummary()
    {
        cout << "\n"
             << string(60, '=') << endl;
        cout << "TEST SUMMARY" << endl;
        cout << string(60, '=') << endl;
        cout << "Total Tests:  " << totalTests << endl;
        cout << "Passed:       " << passedTests << " ✓" << endl;
        cout << "Failed:       " << failedTests << " ✗" << endl;
        cout << "Success Rate: " << (totalTests > 0 ? (passedTests * 100.0 / totalTests) : 0) << "%" << endl;
        cout << string(60, '=') << endl;
    }
};

TestResult testResults;

void assertEqual(const vector<int> &actual, const vector<int> &expected, const string &testName)
{
    testResults.totalTests++;
    if (actual == expected)
    {
        testResults.passedTests++;
        cout << "✓ PASS: " << testName << endl;
    }
    else
    {
        testResults.failedTests++;
        cout << "✗ FAIL: " << testName << endl;
        cout << "  Expected: ";
        for (int x : expected)
            cout << x << " ";
        cout << "\n  Actual:   ";
        for (int x : actual)
            cout << x << " ";
        cout << endl;
    }
}

bool isSorted(const vector<int> &arr)
{
    for (int i = 1; i < arr.size(); i++)
    {
        if (arr[i] < arr[i - 1])
            return false;
    }
    return true;
}

void assertSorted(const vector<int> &arr, const string &testName)
{
    testResults.totalTests++;
    if (isSorted(arr))
    {
        testResults.passedTests++;
        cout << "✓ PASS: " << testName << endl;
    }
    else
    {
        testResults.failedTests++;
        cout << "✗ FAIL: " << testName << endl;
    }
}

// ============================================================================
// TEST CASES
// ============================================================================

void runQuickSortTests()
{
    cout << "\n"
         << string(60, '-') << endl;
    cout << "QUICKSORT TESTS" << endl;
    cout << string(60, '-') << endl;

    // Test 1: Empty array
    {
        vector<int> arr = {};
        quickSort(arr, 0, arr.size() - 1);
        assertSorted(arr, "Empty array");
    }

    // Test 2: Single element
    {
        vector<int> arr = {42};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {42}, "Single element");
    }

    // Test 3: Two elements (unsorted)
    {
        vector<int> arr = {2, 1};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2}, "Two elements (unsorted)");
    }

    // Test 4: Already sorted array
    {
        vector<int> arr = {1, 2, 3, 4, 5};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Already sorted array");
    }

    // Test 5: Reverse sorted array
    {
        vector<int> arr = {5, 4, 3, 2, 1};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Reverse sorted array");
    }

    // Test 6: Array with duplicates
    {
        vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}, "Array with duplicates");
    }

    // Test 7: All duplicate elements
    {
        vector<int> arr = {7, 7, 7, 7, 7};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {7, 7, 7, 7, 7}, "All duplicate elements");
    }

    // Test 8: Negative numbers
    {
        vector<int> arr = {-5, 3, -1, 0, 2, -10};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {-10, -5, -1, 0, 2, 3}, "Negative numbers");
    }

    // Test 9: Mixed positive and negative
    {
        vector<int> arr = {10, -5, 0, 3, -8, 1, -1, 5};
        quickSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {-8, -5, -1, 0, 1, 3, 5, 10}, "Mixed positive and negative");
    }

    // Test 10: Large random array
    {
        vector<int> arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        quickSort(arr, 0, arr.size() - 1);
        assertSorted(arr, "Large random array");
    }
}

void runMergeSortTests()
{
    cout << "\n"
         << string(60, '-') << endl;
    cout << "MERGESORT TESTS" << endl;
    cout << string(60, '-') << endl;

    // Test 1: Empty array
    {
        vector<int> arr = {};
        if (arr.size() > 0)
            mergeSort(arr, 0, arr.size() - 1);
        assertSorted(arr, "Empty array");
    }

    // Test 2: Single element
    {
        vector<int> arr = {42};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {42}, "Single element");
    }

    // Test 3: Two elements (unsorted)
    {
        vector<int> arr = {2, 1};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2}, "Two elements (unsorted)");
    }

    // Test 4: Already sorted array
    {
        vector<int> arr = {1, 2, 3, 4, 5};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Already sorted array");
    }

    // Test 5: Reverse sorted array
    {
        vector<int> arr = {5, 4, 3, 2, 1};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Reverse sorted array");
    }

    // Test 6: Array with duplicates
    {
        vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}, "Array with duplicates");
    }

    // Test 7: All duplicate elements
    {
        vector<int> arr = {7, 7, 7, 7, 7};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {7, 7, 7, 7, 7}, "All duplicate elements");
    }

    // Test 8: Negative numbers
    {
        vector<int> arr = {-5, 3, -1, 0, 2, -10};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {-10, -5, -1, 0, 2, 3}, "Negative numbers");
    }

    // Test 9: Mixed positive and negative
    {
        vector<int> arr = {10, -5, 0, 3, -8, 1, -1, 5};
        mergeSort(arr, 0, arr.size() - 1);
        assertEqual(arr, {-8, -5, -1, 0, 1, 3, 5, 10}, "Mixed positive and negative");
    }

    // Test 10: Large random array
    {
        vector<int> arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        mergeSort(arr, 0, arr.size() - 1);
        assertSorted(arr, "Large random array");
    }
}

void runHeapSortTests()
{
    cout << "\n"
         << string(60, '-') << endl;
    cout << "HEAPSORT TESTS" << endl;
    cout << string(60, '-') << endl;

    // Test 1: Empty array
    {
        vector<int> arr = {};
        heapSort(arr);
        assertSorted(arr, "Empty array");
    }

    // Test 2: Single element
    {
        vector<int> arr = {42};
        heapSort(arr);
        assertEqual(arr, {42}, "Single element");
    }

    // Test 3: Two elements (unsorted)
    {
        vector<int> arr = {2, 1};
        heapSort(arr);
        assertEqual(arr, {1, 2}, "Two elements (unsorted)");
    }

    // Test 4: Already sorted array
    {
        vector<int> arr = {1, 2, 3, 4, 5};
        heapSort(arr);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Already sorted array");
    }

    // Test 5: Reverse sorted array
    {
        vector<int> arr = {5, 4, 3, 2, 1};
        heapSort(arr);
        assertEqual(arr, {1, 2, 3, 4, 5}, "Reverse sorted array");
    }

    // Test 6: Array with duplicates
    {
        vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        heapSort(arr);
        assertEqual(arr, {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}, "Array with duplicates");
    }

    // Test 7: All duplicate elements
    {
        vector<int> arr = {7, 7, 7, 7, 7};
        heapSort(arr);
        assertEqual(arr, {7, 7, 7, 7, 7}, "All duplicate elements");
    }

    // Test 8: Negative numbers
    {
        vector<int> arr = {-5, 3, -1, 0, 2, -10};
        heapSort(arr);
        assertEqual(arr, {-10, -5, -1, 0, 2, 3}, "Negative numbers");
    }

    // Test 9: Mixed positive and negative
    {
        vector<int> arr = {10, -5, 0, 3, -8, 1, -1, 5};
        heapSort(arr);
        assertEqual(arr, {-8, -5, -1, 0, 1, 3, 5, 10}, "Mixed positive and negative");
    }

    // Test 10: Large random array
    {
        vector<int> arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        heapSort(arr);
        assertSorted(arr, "Large random array");
    }
}

void runStdSortTests()
{
    cout << "\n"
         << string(60, '-') << endl;
    cout << "STD::SORT TESTS (Built-in)" << endl;
    cout << string(60, '-') << endl;

    // Test 1: Empty array
    {
        vector<int> arr = {};
        sort(arr.begin(), arr.end());
        assertSorted(arr, "Empty array");
    }

    // Test 2: Single element
    {
        vector<int> arr = {42};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {42}, "Single element");
    }

    // Test 3: Two elements (unsorted)
    {
        vector<int> arr = {2, 1};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {1, 2}, "Two elements (unsorted)");
    }

    // Test 4: Already sorted array
    {
        vector<int> arr = {1, 2, 3, 4, 5};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {1, 2, 3, 4, 5}, "Already sorted array");
    }

    // Test 5: Reverse sorted array
    {
        vector<int> arr = {5, 4, 3, 2, 1};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {1, 2, 3, 4, 5}, "Reverse sorted array");
    }

    // Test 6: Array with duplicates
    {
        vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}, "Array with duplicates");
    }

    // Test 7: All duplicate elements
    {
        vector<int> arr = {7, 7, 7, 7, 7};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {7, 7, 7, 7, 7}, "All duplicate elements");
    }

    // Test 8: Negative numbers
    {
        vector<int> arr = {-5, 3, -1, 0, 2, -10};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {-10, -5, -1, 0, 2, 3}, "Negative numbers");
    }

    // Test 9: Mixed positive and negative
    {
        vector<int> arr = {10, -5, 0, 3, -8, 1, -1, 5};
        sort(arr.begin(), arr.end());
        assertEqual(arr, {-8, -5, -1, 0, 1, 3, 5, 10}, "Mixed positive and negative");
    }

    // Test 10: Large random array
    {
        vector<int> arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        sort(arr.begin(), arr.end());
        assertSorted(arr, "Large random array");
    }
}

void runLargeDatasetTests()
{
    cout << "\n"
         << string(60, '-') << endl;
    cout << "LARGE DATASET TESTS" << endl;
    cout << string(60, '-') << endl;

    // Test with 1000 elements
    {
        vector<int> arr;
        for (int i = 1000; i > 0; i--)
        {
            arr.push_back(i);
        }

        vector<int> arr1 = arr, arr2 = arr, arr3 = arr, arr4 = arr;

        quickSort(arr1, 0, arr1.size() - 1);
        assertSorted(arr1, "QuickSort - 1000 elements (reverse sorted)");

        mergeSort(arr2, 0, arr2.size() - 1);
        assertSorted(arr2, "MergeSort - 1000 elements (reverse sorted)");

        heapSort(arr3);
        assertSorted(arr3, "HeapSort - 1000 elements (reverse sorted)");

        sort(arr4.begin(), arr4.end());
        assertSorted(arr4, "std::sort - 1000 elements (reverse sorted)");
    }

    // Test with 1000 random elements
    {
        vector<int> arr;
        srand(42);
        for (int i = 0; i < 1000; i++)
        {
            arr.push_back(rand() % 10000);
        }

        vector<int> arr1 = arr, arr2 = arr, arr3 = arr, arr4 = arr;

        quickSort(arr1, 0, arr1.size() - 1);
        assertSorted(arr1, "QuickSort - 1000 random elements");

        mergeSort(arr2, 0, arr2.size() - 1);
        assertSorted(arr2, "MergeSort - 1000 random elements");

        heapSort(arr3);
        assertSorted(arr3, "HeapSort - 1000 random elements");

        sort(arr4.begin(), arr4.end());
        assertSorted(arr4, "std::sort - 1000 random elements");
    }

    // Test with 1000 elements with many duplicates
    {
        vector<int> arr;
        for (int i = 0; i < 1000; i++)
        {
            arr.push_back(i % 100); // Only 100 unique values
        }

        vector<int> arr1 = arr, arr2 = arr, arr3 = arr, arr4 = arr;

        quickSort(arr1, 0, arr1.size() - 1);
        assertSorted(arr1, "QuickSort - 1000 elements with many duplicates");

        mergeSort(arr2, 0, arr2.size() - 1);
        assertSorted(arr2, "MergeSort - 1000 elements with many duplicates");

        heapSort(arr3);
        assertSorted(arr3, "HeapSort - 1000 elements with many duplicates");

        sort(arr4.begin(), arr4.end());
        assertSorted(arr4, "std::sort - 1000 elements with many duplicates");
    }
}

// ============================================================================
// MAIN
// ============================================================================

int main()
{
    cout << "\n"
         << string(60, '=') << endl;
    cout << "SORTING ALGORITHMS UNIT TESTS" << endl;
    cout << string(60, '=') << endl;

    runQuickSortTests();
    runMergeSortTests();
    runHeapSortTests();
    runStdSortTests();
    runLargeDatasetTests();

    testResults.printSummary();

    // Return 0 if all tests passed, 1 otherwise
    return testResults.failedTests > 0 ? 1 : 0;
}
