// --- NAVIGATION SCREENS ---
const homeScreen = document.getElementById("home-screen");
const letterScreenWrapper = document.getElementById("letter-screen-wrapper");
const rainScreen = document.getElementById("rain-screen");

// --- NAVIGATION BUTTONS ---
const readLetterBtn = document.getElementById("read-letter-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");
const rainToggleBtn = document.getElementById("rain-toggle-btn");
const stopRainBtn = document.getElementById("stop-rain-btn");

// --- COUNTDOWN MODAL ELEMENTS ---
const calendarBtn = document.getElementById("calendar-btn");
const countdownModal = document.getElementById("countdown-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

let rainInterval = null;
let countdownInterval = null;

var raining = false;

const secretMessages = [
  "I love you, Samprita, more than words can say. Happy today! 😘",
  "Baby don't you have any shame being thissss cutee? 🥺",
  "You are my universe ✨",
  "I love you I love you I love you I love you I love you I love you. ❤️",
  "You are the cutest and best gf in the world 🌎",
  "Do you have a name or can I just call you mine? 😉",
  "You're my favorite notification, Samprita. Real talk. 🥰",
  "If you were a triangle, you'd be acute one. 😉",
  "Just a reminder: you look absolutely breathtaking today. Yes, you.",
  "Sending a massive virtual hug to my favorite human ever! 🤗❤️",
  "How did I get so lucky to have Miss Dey in my life? 🥺",
  "Stop being so far away, my arms miss their favorite spot.",
  "You hold my whole heart, cutie. Completely and entirely. 🔐💖",
  "My days are just 100x better when I'm talking to you.",
  "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
  "You're my absolute happy place, baby. 😘",
];

// --- SCREEN SWITCHING NAVIGATION ---
readLetterBtn.addEventListener("click", function () {
  for (let i = 0; i < 5; i++) {
    createHeart(readLetterBtn);
  }
  homeScreen.classList.remove("active");
  setTimeout(() => {
    letterScreenWrapper.classList.add("active");
  }, 150);
});

backToHomeBtn.addEventListener("click", function () {
  letterScreenWrapper.classList.remove("active");
  setTimeout(() => {
    homeScreen.classList.add("active");
  }, 150);
});

// --- SURPRISE BUTTON INTERACTION ---
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
      message.textContent =
        secretMessages[Math.floor(Math.random() * secretMessages.length)];
      button.textContent = "Close message";

      for (let i = 0; i < 25; i++) {
        createHeart(button);
      }
    }
  });

// --- FLOATING BURST LOGIC ---
function createHeart(button) {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤️";

  const rect = button.getBoundingClientRect();
  const activeCard = button.closest(".container");
  const containerRect = activeCard.getBoundingClientRect();

  const x = rect.left - containerRect.left + Math.random() * rect.width;
  const y = rect.top - containerRect.top - 15 * Math.random();

  heart.style.left = x + "px";
  heart.style.top = y + "px";

  activeCard.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// --- FULLSCREEN HEART RAIN ENGINE ---
function startHeartRain() {
  if (!raining) {
    homeScreen.classList.remove("active");
    letterScreenWrapper.classList.remove("active");
    raining = true;
    setTimeout(() => {
      rainScreen.classList.add("active");
      rainInterval = setInterval(createFallingHeart, 300);
    }, 150);
  }
}

function stopHeartRain() {
  if (raining) {
    rainScreen.classList.remove("active");
    clearInterval(rainInterval);

    document.querySelectorAll(".falling-heart").forEach((h) => h.remove());
    setTimeout(() => {
      homeScreen.classList.add("active");
      raining = false;
    }, 150);
  }
}

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.innerHTML = "❤️";

  const startPos = Math.random() * window.innerWidth;
  const duration = Math.random() * 3 + 2;
  const size = Math.random() * 20 + 15;
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = startPos + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.fontSize = size + "px";
  heart.style.opacity = opacity;

  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

rainToggleBtn.addEventListener("click", startHeartRain);
stopRainBtn.addEventListener("click", stopHeartRain);

// --- DYNAMIC CALENDAR ENGINE ---
// --- DYNAMIC CALENDAR ENGINE (COUNT-UP FROM SEPT 20, 2025) ---
function updateCountdown() {
  const now = new Date();

  // Lock the target date strictly to September 20, 2025
  const targetDate = new Date("September 20, 2025 00:00:00").getTime();
  const nowTime = now.getTime();

  // Calculate the absolute time elapsed since that date
  let difference = nowTime - targetDate;

  // Permanently set the title to a count-up theme
  document.getElementById("countdown-title").textContent =
    "Official Time Since 'Us' ";

  // Fallback check just in case the system clock is ever incorrectly set before the date
  if (difference < 0) {
    difference = 0;
  }

  // Parse time intervals down to individual layout units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Formats UI counters into twin digits strings natively (e.g. "07")
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

calendarBtn.addEventListener("click", function () {
  countdownModal.classList.add("active");
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

function closeModal() {
  countdownModal.classList.remove("active");
  clearInterval(countdownInterval);
}

closeModalBtn.addEventListener("click", closeModal);
countdownModal.addEventListener("click", function (e) {
  if (e.target === countdownModal) closeModal();
});
