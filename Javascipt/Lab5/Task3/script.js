let win;

function OpenWin() {
    // Open a small popup window with the ad page
    // Tiny size like an annoying ad, with scrollbars enabled
    win = window.open("child.html", "", "width=250,height=250,scrollbars=yes,resizable=yes");

    // Bring it to front
    if (win) {
        win.focus();
    }

    // Wait a bit for the window to load, then start auto-scrolling
    setTimeout(() => {
        if (!win || win.closed) return; // Safety check in case it closed early
    }, 500); // Delay start by 500ms
}
