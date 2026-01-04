// Self-contained typing animation that runs on page load.
// Types out the message char-by-char, then waits 3 seconds, fades out, and closes.
const message = "typing message...";
const typingElement = document.getElementById('typing');
let charIndex = 0;

function typeNextChar() {
  if (charIndex < message.length) {
    // Append next character naturally
    typingElement.textContent += message.charAt(charIndex);
    charIndex++;
    setTimeout(typeNextChar, 80);
  } else {
    // Typing complete! Stop blinking cursor and schedule close.
    typingElement.style.borderRight = 'none';
    setTimeout(() => {
      // Fade out the body for a smooth exit
      document.body.classList.add('closing');
      setTimeout(() => {
        // Close the window after fade
        window.close();
      }, 1000);
    }, 3000); // Display full message for 3 seconds
  }
}

// Kick off the typing effect immediately on load
typeNextChar();