#include <iostream>
#include <vector>
#include <stack>
#include <chrono>
#include <algorithm>
#include <random>

using namespace std;
using namespace chrono;

// Partition function used by both versions
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Recursive QuickSort
void quicksortRecursive(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quicksortRecursive(arr, low, pi - 1);
        quicksortRecursive(arr, pi + 1, high);
    }
}

// Iterative QuickSort
void quicksortIterative(vector<int>& arr, int low, int high) {
    stack<pair<int, int>> st;
    st.push({low, high});
    
    while (!st.empty()) {
        auto [l, h] = st.top();
        st.pop();
        
        if (l < h) {
            int pi = partition(arr, l, h);
            st.push({l, pi - 1});
            st.push({pi + 1, h});
        }
    }
}

// Function to generate random array
vector<int> generateRandomArray(int size) {
    vector<int> arr(size);
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 10000);
    
    for (int i = 0; i < size; i++) {
        arr[i] = dis(gen);
    }
    return arr;
}

int main() {
    vector<int> sizes = {1000, 5000, 10000, 50000};
    
    cout << "QuickSort Comparison: Recursive vs Iterative\n";
    cout << "============================================\n\n";
    
    for (int size : sizes) {
        vector<int> arr = generateRandomArray(size);
        vector<int> arr1 = arr;
        vector<int> arr2 = arr;
        
        // Test Recursive QuickSort
        auto start = high_resolution_clock::now();
        quicksortRecursive(arr1, 0, arr1.size() - 1);
        auto end = high_resolution_clock::now();
        auto recursiveDuration = duration_cast<microseconds>(end - start);
        
        // Test Iterative QuickSort
        start = high_resolution_clock::now();
        quicksortIterative(arr2, 0, arr2.size() - 1);
        end = high_resolution_clock::now();
        auto iterativeDuration = duration_cast<microseconds>(end - start);
        
        cout << "Array Size: " << size << endl;
        cout << "Recursive: " << recursiveDuration.count() << " microseconds" << endl;
        cout << "Iterative: " << iterativeDuration.count() << " microseconds" << endl;
        cout << "Difference: " << abs(recursiveDuration.count() - iterativeDuration.count()) 
             << " microseconds" << endl;
        cout << "-------------------------------------------\n";
    }
    
    return 0;
}