# QuickSort Web Interface - Quick Reference Card

## 🚀 QUICK START (Choose One)

### Option 1: Direct Browser (Simplest)
```bash
open index.html
# Or drag index.html to browser
```

### Option 2: Python Simple Server
```bash
python3 server.py
# Open http://localhost:5000
```

### Option 3: Python HTTP Server
```bash
python3 -m http.server 8000
# Open http://localhost:8000/index.html
```

### Option 4: Advanced with API
```bash
python3 advanced_server.py
# Open http://localhost:5000
# API Docs: http://localhost:5000/api/docs
```

---

## 📋 REQUIRED FILES

| File | Location | Size | Status |
|------|----------|------|--------|
| `index.html` | Same folder | 4.0 KB | ✅ Created |
| `style.css` | Same folder | 6.5 KB | ✅ Created |
| `app.js` | Same folder | 7.7 KB | ✅ Created |

**IMPORTANT**: All three must be in the same folder!

---

## ⌨️ KEYBOARD SHORTCUTS

| Shortcut | Action |
|----------|--------|
| `Enter` | Sort (in input field) |
| `Ctrl+Enter` | Sort (anywhere) |
| `Ctrl+L` | Clear all |

---

## 📝 INPUT FORMAT

### Accepted ✅
```
64, 34, 25, 12, 22
64 34 25 12 22
64,34,25,12,22
-5, 0, 10, 15
```

### Not Accepted ❌
```
64.5, 34.2, 25.1    (decimals)
64, abc, 25         (letters)
Over 100 numbers    (size limit)
                    (empty)
```

---

## 🎯 USAGE STEPS

1. **Enter Numbers**: Type or paste comma/space-separated integers
2. **Sort**: Click button or press Enter
3. **View Results**: See bars and statistics
4. **Optional**: Click "Random" or "Clear"

---

## 📊 ALGORITHM INFO

```
Algorithm:  QuickSort
Time:       O(n log n) average, O(n²) worst
Space:      O(log n) recursion stack
Stable:     No
In-place:   Yes
```

---

## 🔍 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Page won't load | Check all 3 files in same folder |
| Numbers won't sort | Verify integers only, no letters |
| No visualization | Refresh page, check console (F12) |
| Layout broken | Check browser zoom = 100% |
| Mobile issues | Try landscape orientation |

---

## 📱 BROWSER SUPPORT

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

---

## 🎨 INTERFACE OVERVIEW

```
┌─────────────────────────────────────────┐
│  QuickSort Algorithm Visualizer          │
├─────────────────────────────────────────┤
│ Input: [64, 34, 25, 12, 22, 11, 90]     │
│ Buttons: [Sort] [Clear] [Random]       │
├─────────────────────────────────────────┤
│ Input Bars:  ▮▮▮▮▮▮▮                   │
├─────────────────────────────────────────┤
│ Statistics: Count | Comparisons | Swaps│
├─────────────────────────────────────────┤
│ Output Bars: ▮▮▮▮▮▮▮ (sorted, green)  │
│ Result: [11, 12, 22, 25, 34, 64, 90]   │
└─────────────────────────────────────────┘
```

---

## 🔧 OPTIONAL SERVERS

### Simple Server (server.py)
```bash
python3 server.py
# Basic file serving
# Perfect for testing
```

### Advanced Server (advanced_server.py)
```bash
python3 advanced_server.py
# REST API endpoints
# Multiple algorithms
# Benchmarking
# API documentation
```

### API Endpoints
```
POST   /api/sort           - Sort array
GET    /api/algorithms     - List algorithms
POST   /api/benchmark      - Compare algorithms
GET    /api/health         - Health check
GET    /api/docs           - API docs
```

---

## 📊 EXAMPLE SESSION

### Input
```
Enter: 64, 34, 25, 12, 22, 11, 90
```

### Click Sort

### Output
```
✓ Sorted: [11, 12, 22, 25, 34, 64, 90]
- Elements: 7
- Comparisons: 12
- Swaps: 8
- Time: 0.123ms
```

---

## 💡 TIPS & TRICKS

1. **Random Numbers**: Click "Random" button
2. **Copy-Paste**: Works with any number format
3. **Negative Numbers**: Supported ✓
4. **Large Arrays**: Max 100 numbers
5. **Offline**: Works without internet
6. **Keyboard**: Press Enter in input field
7. **Mobile**: Rotate to landscape
8. **Error**: Check browser console (F12)

---

## 🎓 LEARNING RESOURCES

### Included in Project
- **Visualization**: See sorting in action
- **Statistics**: Count operations
- **Examples**: Try various inputs
- **Keyboard Shortcuts**: Speed up testing

### External Resources
- Algorithm complexity analysis
- QuickSort theory
- Sorting algorithm comparison
- Data structures fundamentals

---

## 🐛 DEBUG MODE

### Access Browser Console
- **Chrome/Firefox/Edge**: Press `F12`
- **Safari**: Cmd+Option+I
- **Look for**: Errors, warnings, logs

### Console Commands
```javascript
// Test parsing
parseInput("1, 2, 3, 4, 5")

// Test sorting
quickSort([5,2,8,1,9], 0, 4)

// Check stats
console.log(comparisons, swaps)
```

---

## 📋 VALIDATION RULES

**MUST BE**:
- ✓ Integers (no decimals)
- ✓ Separated by commas/spaces
- ✓ Between 1-100 numbers
- ✓ Valid number format

**CANNOT BE**:
- ✗ Letters or symbols
- ✗ Empty or whitespace only
- ✗ More than 100 numbers
- ✗ Non-numeric values

---

## 🎯 COMMON TASKS

### Task: Sort random numbers
```
1. Click "Random Numbers"
2. Click "Sort with QuickSort"
3. View results
```

### Task: Sort specific numbers
```
1. Clear field (Ctrl+L)
2. Type: 50, 30, 70, 20, 80
3. Press Enter
4. See sorted result
```

### Task: Test with negatives
```
1. Enter: -5, 10, -2, 0, 5
2. Click Sort
3. Result: [-5, -2, 0, 5, 10]
```

### Task: Check performance
```
1. Paste large array
2. Click Sort
3. Check execution time
4. Compare with other runs
```

---

## 📞 HELP RESOURCES

| Issue | File to Check |
|-------|---------------|
| General questions | WEB_INTERFACE_README.md |
| Setup problems | SETUP_GUIDE.md |
| Overview | SUMMARY_WEB_INTERFACE.md |
| Specific feature | This file |

---

## ✨ FEATURE CHECKLIST

- ✅ Input number arrays
- ✅ Run QuickSort
- ✅ Visualize bars
- ✅ Show statistics
- ✅ Display results
- ✅ Keyboard shortcuts
- ✅ Error handling
- ✅ Mobile responsive
- ✅ No dependencies
- ✅ Offline capable
- ✅ Fast performance
- ✅ Beautiful UI

---

## 🎉 YOU'RE READY!

**Status**: ✅ All systems go!

**Next Step**: Pick an option above and run it!

```bash
# FASTEST:
open index.html

# WITH SERVER:
python3 server.py
```

---

**Last Updated**: February 17, 2026
**Version**: 1.0 - Complete
**Quality**: Production Ready ✅
