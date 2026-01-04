let childWindow = null;
let moveInterval = null;
let direction = 1; // 1 for down, -1 for up
const step = 10;

document.getElementById('openBtn').addEventListener('click', function () {
    if (childWindow && !childWindow.closed) {
        alert("Child window is already open , close it first!");
        return;
    }

    // Open child window
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const width = 300;
    const height = 200;

    const left = screenWidth - width - 50; // Right side, with margin
    const top = 50; // Start near the top

    childWindow = window.open(
        'child.html',
        'FlyingChild',
        `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
    );


    // Bring child window to front periodically (to keep on top)
    const bringToFront = setInterval(() => {
        if (childWindow && !childWindow.closed) {
            childWindow.focus();
        } else {
            clearInterval(bringToFront);
            clearInterval(moveInterval);
        }
    }, 500);

    // Start moving the child window up and down
    moveInterval = setInterval(() => {
        if (!childWindow || childWindow.closed) {
            clearInterval(moveInterval);
            return;
        }

        const winTop = childWindow.screenTop;
        const maxY = screenHeight - height - 50; // Leave margin at bottom
        const minY = 0;

        let newTop = winTop + direction * step;

        if (newTop >= maxY) {
            newTop = maxY;
            direction = -1; // Move up
        } else if (newTop <= minY) {
            newTop = minY;
            direction = 1; // Move down
        }

        childWindow.moveTo(childWindow.screenLeft, newTop);

    }, 100); // Update every 100ms

    // Enable stop button
    document.getElementById('stopBtn').disabled = false;
});

document.getElementById('stopBtn').addEventListener('click', function () {
    if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
    // Disable the button after stopping
    this.disabled = true;
});