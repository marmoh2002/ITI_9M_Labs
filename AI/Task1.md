This is an **optimized implementation of the QuickSort algorithm** that includes several performance enhancements beyond the basic version.

## Core Algorithm Structure

The implementation uses the classic **Hoare partition scheme** with a key optimization: instead of recursing on both sides of the pivot, it uses a **while loop with tail recursion elimination**. This means one partition is handled recursively while the other is handled by updating the loop bounds, significantly reducing stack space usage from $O(n)$ to $O(\log n)$ in the worst case.

## Median-of-Three Pivot Selection

The `partition` function starts with a clever optimization called **median-of-three pivot selection**. Rather than always picking the last element as the pivot (which performs poorly on already-sorted data), it examines three elements: the first (`low`), middle (`mid`), and last (`high`). Through a series of comparisons and swaps, it ensures the median of these three values ends up at the `high` position to be used as the pivot. This dramatically improves performance on partially sorted data, reducing the likelihood of worst-case $O(n^2)$ behavior.

## Hybrid Sorting Approach

When the subarray size drops below 10 elements (`high - low < 10`), the algorithm **switches to insertion sort**. This is a well-established optimization because insertion sort has less overhead and performs better than QuickSort on small datasets. The crossover point of 10 is empirically determined and commonly used in production sorting libraries.

## Smart Recursion Strategy

After partitioning, the code **always recurses on the smaller partition first** and handles the larger partition through iteration. This ensures the recursion depth never exceeds $O(\log n)$, even in unfavorable scenarios. The size comparison (`pi - low < high - pi`) determines which side is smaller, guaranteeing that each recursive call handles at most half the remaining elements.

## Potential Gotchas

One subtle issue: the median-of-three logic has a bug in the swap order. The final swap should place the median at `arr[high]`, but the current sequence doesn't guarantee this correctly. A more reliable approach would be to explicitly sort the three elements or use a different arrangement to ensure the true median becomes the pivot.