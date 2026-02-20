#!/usr/bin/env python3
"""
Advanced Flask Web Server with API Backend
Provides REST API endpoints for sorting algorithms

Usage:
    python3 advanced_server.py
    
Then access:
    - Web Interface: http://localhost:5000/
    - API Docs: http://localhost:5000/docs
    - Sort API: POST http://localhost:5000/api/sort
"""

from flask import Flask, jsonify, request, render_template_string, send_file
import json
import time
from datetime import datetime

app = Flask(__name__)

# ============================================================================
# SORTING ALGORITHMS
# ============================================================================

class SortingAlgorithms:
    def __init__(self):
        self.comparisons = 0
        self.swaps = 0
        self.operations = []
    
    def reset_stats(self):
        """Reset statistics"""
        self.comparisons = 0
        self.swaps = 0
        self.operations = []
    
    def record_operation(self, operation, details):
        """Record an operation for replay"""
        self.operations.append({
            'type': operation,
            'timestamp': len(self.operations),
            'details': details
        })
    
    def quicksort(self, arr, low=None, high=None):
        """QuickSort implementation"""
        if low is None:
            low = 0
        if high is None:
            high = len(arr) - 1
            self.reset_stats()
        
        if low < high:
            pi = self._partition(arr, low, high)
            self.quicksort(arr, low, pi - 1)
            self.quicksort(arr, pi + 1, high)
        
        return arr
    
    def _partition(self, arr, low, high):
        """Partition for QuickSort"""
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            self.comparisons += 1
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                self.swaps += 1
                self.record_operation('swap', {'indices': [i, j], 'values': [arr[i], arr[j]]})
        
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        self.swaps += 1
        self.record_operation('swap', {'indices': [i + 1, high], 'values': [arr[i + 1], arr[high]]})
        return i + 1
    
    def mergesort(self, arr):
        """MergeSort implementation"""
        self.reset_stats()
        if len(arr) <= 1:
            return arr
        
        def merge_sort_helper(arr, left, right):
            if left < right:
                mid = (left + right) // 2
                merge_sort_helper(arr, left, mid)
                merge_sort_helper(arr, mid + 1, right)
                self._merge(arr, left, mid, right)
            return arr
        
        return merge_sort_helper(arr, 0, len(arr) - 1)
    
    def _merge(self, arr, left, mid, right):
        """Merge for MergeSort"""
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]
        
        i = j = 0
        k = left
        
        while i < len(left_arr) and j < len(right_arr):
            self.comparisons += 1
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1
            self.swaps += 1
        
        while i < len(left_arr):
            arr[k] = left_arr[i]
            i += 1
            k += 1
        
        while j < len(right_arr):
            arr[k] = right_arr[j]
            j += 1
            k += 1
    
    def heapsort(self, arr):
        """HeapSort implementation"""
        self.reset_stats()
        n = len(arr)
        
        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            self._heapify(arr, n, i)
        
        # Extract elements from heap
        for i in range(n - 1, 0, -1):
            arr[0], arr[i] = arr[i], arr[0]
            self.swaps += 1
            self._heapify(arr, i, 0)
        
        return arr
    
    def _heapify(self, arr, n, i):
        """Heapify for HeapSort"""
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n:
            self.comparisons += 1
            if arr[left] > arr[largest]:
                largest = left
        
        if right < n:
            self.comparisons += 1
            if arr[right] > arr[largest]:
                largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            self.swaps += 1
            self._heapify(arr, n, largest)

# Initialize algorithms
algo = SortingAlgorithms()

# ============================================================================
# ROUTES - HTML/CSS/JS
# ============================================================================

@app.route('/')
def index():
    """Serve the main interface"""
    with open('/home/mariam/Documents/repo/ITI_9M_Labs/AI/index.html', 'r') as f:
        return f.read()

@app.route('/style.css')
def style():
    """Serve CSS"""
    with open('/home/mariam/Documents/repo/ITI_9M_Labs/AI/style.css', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/css'}

@app.route('/app.js')
def javascript():
    """Serve JavaScript"""
    with open('/home/mariam/Documents/repo/ITI_9M_Labs/AI/app.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'application/javascript'}

# ============================================================================
# API ROUTES
# ============================================================================

@app.route('/api/sort', methods=['POST'])
def api_sort():
    """
    REST API endpoint for sorting
    
    Request JSON:
    {
        "numbers": [64, 34, 25, 12],
        "algorithm": "quicksort"  # or "mergesort", "heapsort"
    }
    """
    try:
        data = request.json
        numbers = data.get('numbers', [])
        algorithm = data.get('algorithm', 'quicksort').lower()
        
        # Validation
        if not numbers:
            return jsonify({'error': 'No numbers provided'}), 400
        
        if not all(isinstance(n, (int, float)) for n in numbers):
            return jsonify({'error': 'Invalid number format'}), 400
        
        if len(numbers) > 1000:
            return jsonify({'error': 'Too many numbers (max 1000)'}), 400
        
        # Convert to int
        numbers = [int(n) for n in numbers]
        original = numbers.copy()
        
        # Sort
        start_time = time.time()
        
        if algorithm == 'quicksort':
            sorted_arr = algo.quicksort(numbers.copy())
        elif algorithm == 'mergesort':
            sorted_arr = algo.mergesort(numbers.copy())
        elif algorithm == 'heapsort':
            sorted_arr = algo.heapsort(numbers.copy())
        else:
            return jsonify({'error': f'Unknown algorithm: {algorithm}'}), 400
        
        end_time = time.time()
        
        # Return response
        return jsonify({
            'success': True,
            'algorithm': algorithm,
            'input': original,
            'output': sorted_arr,
            'statistics': {
                'element_count': len(numbers),
                'comparisons': algo.comparisons,
                'swaps': algo.swaps,
                'execution_time_ms': round((end_time - start_time) * 1000, 4)
            },
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/algorithms', methods=['GET'])
def api_algorithms():
    """List available algorithms"""
    return jsonify({
        'algorithms': [
            {
                'name': 'QuickSort',
                'id': 'quicksort',
                'time_complexity': 'O(n log n) average, O(n²) worst',
                'space_complexity': 'O(log n)',
                'stable': False
            },
            {
                'name': 'MergeSort',
                'id': 'mergesort',
                'time_complexity': 'O(n log n) guaranteed',
                'space_complexity': 'O(n)',
                'stable': True
            },
            {
                'name': 'HeapSort',
                'id': 'heapsort',
                'time_complexity': 'O(n log n) guaranteed',
                'space_complexity': 'O(1)',
                'stable': False
            }
        ]
    }), 200

@app.route('/api/benchmark', methods=['POST'])
def api_benchmark():
    """
    Benchmark all algorithms
    
    Request JSON:
    {
        "numbers": [64, 34, 25, 12, 22, 11, 90]
    }
    """
    try:
        data = request.json
        numbers = data.get('numbers', [])
        
        if not numbers:
            return jsonify({'error': 'No numbers provided'}), 400
        
        numbers = [int(n) for n in numbers]
        results = {}
        
        for algorithm in ['quicksort', 'mergesort', 'heapsort']:
            start_time = time.time()
            
            if algorithm == 'quicksort':
                algo.quicksort(numbers.copy())
            elif algorithm == 'mergesort':
                algo.mergesort(numbers.copy())
            elif algorithm == 'heapsort':
                algo.heapsort(numbers.copy())
            
            end_time = time.time()
            
            results[algorithm] = {
                'comparisons': algo.comparisons,
                'swaps': algo.swaps,
                'execution_time_ms': round((end_time - start_time) * 1000, 4)
            }
        
        return jsonify({
            'success': True,
            'input': numbers,
            'benchmark_results': results,
            'element_count': len(numbers)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/docs', methods=['GET'])
def api_docs():
    """API Documentation"""
    docs = """
    <html>
    <head>
        <title>QuickSort API Documentation</title>
        <style>
            body { font-family: Arial; margin: 20px; background: #f5f5f5; }
            .endpoint { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #667eea; }
            code { background: #f0f0f0; padding: 2px 5px; border-radius: 3px; }
            pre { background: #f0f0f0; padding: 10px; border-radius: 3px; overflow-x: auto; }
        </style>
    </head>
    <body>
        <h1>🔄 QuickSort Web Interface - API Documentation</h1>
        
        <div class="endpoint">
            <h3>POST /api/sort</h3>
            <p>Sort an array of numbers using specified algorithm</p>
            <p><strong>Request:</strong></p>
            <pre>{
  "numbers": [64, 34, 25, 12, 22, 11, 90],
  "algorithm": "quicksort"
}</pre>
            <p><strong>Response:</strong></p>
            <pre>{
  "success": true,
  "algorithm": "quicksort",
  "input": [64, 34, 25, 12, 22, 11, 90],
  "output": [11, 12, 22, 25, 34, 64, 90],
  "statistics": {
    "element_count": 7,
    "comparisons": 12,
    "swaps": 8,
    "execution_time_ms": 0.123
  }
}</pre>
        </div>
        
        <div class="endpoint">
            <h3>GET /api/algorithms</h3>
            <p>Get list of available sorting algorithms</p>
            <p><strong>Response includes:</strong> Algorithm name, complexity, stability</p>
        </div>
        
        <div class="endpoint">
            <h3>POST /api/benchmark</h3>
            <p>Benchmark all algorithms with the same input</p>
            <p><strong>Request:</strong></p>
            <pre>{
  "numbers": [64, 34, 25, 12, 22, 11, 90]
}</pre>
        </div>
    </body>
    </html>
    """
    return docs, 200, {'Content-Type': 'text/html'}

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'QuickSort Web Interface',
        'timestamp': datetime.now().isoformat()
    }), 200

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    print("=" * 70)
    print("QuickSort Web Interface - Advanced Server with API")
    print("=" * 70)
    print("\n📍 Services:")
    print("   • Web Interface: http://localhost:5000/")
    print("   • API Docs:     http://localhost:5000/api/docs")
    print("   • API Health:   http://localhost:5000/api/health")
    print("\n📡 API Endpoints:")
    print("   • POST /api/sort       - Sort with specified algorithm")
    print("   • GET  /api/algorithms - List available algorithms")
    print("   • POST /api/benchmark  - Benchmark all algorithms")
    print("\n⌨️  Press Ctrl+C to stop the server")
    print("=" * 70 + "\n")
    
    app.run(debug=True, host='localhost', port=5000)
