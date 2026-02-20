#!/usr/bin/env python3
"""
Simple Flask web server for QuickSort Visualizer
Serves the web interface at http://localhost:5000
"""

from flask import Flask, render_template_string
import os

app = Flask(__name__)

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    """Serve the main HTML page"""
    html_path = os.path.join(BASE_DIR, 'index.html')
    with open(html_path, 'r') as f:
        return f.read()

@app.route('/style.css')
def style():
    """Serve the CSS file"""
    css_path = os.path.join(BASE_DIR, 'style.css')
    with open(css_path, 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/css'}

@app.route('/app.js')
def javascript():
    """Serve the JavaScript file"""
    js_path = os.path.join(BASE_DIR, 'app.js')
    with open(js_path, 'r') as f:
        return f.read(), 200, {'Content-Type': 'application/javascript'}

if __name__ == '__main__':
    print("=" * 60)
    print("QuickSort Web Interface")
    print("=" * 60)
    print("\n✓ Server starting...")
    print("✓ Open your browser and go to: http://localhost:5000")
    print("✓ Press Ctrl+C to stop the server\n")
    
    app.run(debug=True, host='localhost', port=5000)
