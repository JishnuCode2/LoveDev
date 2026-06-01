// Screen navigation handling
const homeScreen = document.getElementById("card");
const letterScreen = document.getElementById("letter-screen");

const readLetterBtn = document.getElementById("read-letter-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");

// Transition to Letter Screen
readLetterBtn.addEventListener("click", function () {
  for (let i = 0; i < 5; i++) {
    createHeart(readLetterBtn);
  }

  // Tiny delay allows seamless CSS display toggling
  setTimeout(() => {
    homeScreen.classList.remove("active");
  }, 300);
  setTimeout(() => {
    letterScreen.classList.add("active");
  }, 600);
});

// Transition Back to Home Screen
backToHomeBtn.addEventListener("click", function () {
  letterScreen.classList.remove("active");

  setTimeout(() => {
    homeScreen.classList.add("active");
  }, 600);
});

// Surprise/Toggle Button Handling
document
  .getElementById("surprise-btn")
  .addEventListener("click", function (event) {
    const message = document.getElementById("secret-message");
    const button = event.currentTarget;

    if (message.style.display === "block") {
      message.style.display = "none";
      button.textContent = "Click for a surprise";
    } else {
      message.style.display = "block";
      button.textContent = "Close message";

      // Spawns 5 floating hearts near the button tap area
      for (let i = 0; i < 25; i++) {
        createHeart(button);
      }
    }
  });

// Dynamic Floating Heart Animation Logic
function createHeart(button) {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤️";

  const rect = button.getBoundingClientRect();
  const card = document.getElementById("card");
  const containerRect = card.getBoundingClientRect();

  // Calculates position relative to the container card
  const x = rect.left - containerRect.left + Math.random() * rect.width;
  const y = rect.top - containerRect.top - 15 * Math.random();

  heart.style.left = x + "px";
  heart.style.top = y + "px";

  card.appendChild(heart);

  // Clean up element from the DOM after animation completes
  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// New Elements
const rainScreen = document.getElementById("rain-screen");
const rainToggleBtn = document.getElementById("rain-toggle-btn");
const stopRainBtn = document.getElementById("stop-rain-btn");
let rainInterval = null;

// Function to start the heart rain
function startHeartRain() {
  homeScreen.classList.remove("active");
  letterScreen.classList.remove("active");

  setTimeout(() => {
    rainScreen.classList.add("active");
    // Start generating hearts every 300ms
    rainInterval = setInterval(createFallingHeart, 300);
  }, 150);
}

// Function to stop the heart rain
function stopHeartRain() {
  rainScreen.classList.remove("active");
  clearInterval(rainInterval);

  // Clean up any remaining falling hearts
  const hearts = document.querySelectorAll(".falling-heart");
  hearts.forEach((h) => h.remove());

  setTimeout(() => {
    homeScreen.classList.add("active");
  }, 150);
}

// Logic to create a single falling heart
function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.innerHTML = "❤️";

  // Randomize position, size, and speed
  const startPos = Math.random() * window.innerWidth;
  const duration = Math.random() * 3 + 2; // 2s to 5s
  const size = Math.random() * 20 + 15; // 15px to 35px
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = startPos + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.fontSize = size + "px";
  heart.style.opacity = opacity;

  document.body.appendChild(heart);

  // Remove heart after it falls off screen
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Event Listeners
rainToggleBtn.addEventListener("click", startHeartRain);
stopRainBtn.addEventListener("click", stopHeartRain);
